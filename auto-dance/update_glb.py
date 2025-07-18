import json
import struct
import sys

def update_glb(input_path, output_path, new_uri_prefix):
    with open(input_path, 'rb') as f:
        data = f.read()

    magic = data[0:4]
    if magic != b'glTF':
        raise ValueError("Not a GLB file")

    version, = struct.unpack('<I', data[4:8])
    if version != 2:
        raise ValueError("Unsupported GLTF version")

    total_length, = struct.unpack('<I', data[8:12])

    json_length, = struct.unpack('<I', data[12:16])
    chunk_type = data[16:20]
    if chunk_type != b'JSON':
        raise ValueError("First chunk is not JSON")

    json_start = 20
    json_data = data[json_start:json_start + json_length]
    gltf = json.loads(json_data)

    images = gltf.get('images', [])
    for img in images:
        if 'uri' in img:
            img['uri'] = new_uri_prefix + img['uri']

    new_json_str = json.dumps(gltf, separators=(',', ':'))
    new_json = new_json_str.encode('utf-8')

    # Pad JSON to 4-byte boundary with spaces
    pad = (4 - len(new_json) % 4) % 4
    new_json += b' ' * pad
    new_json_length = len(new_json)

    # Extract BIN chunk if present
    bin_start = json_start + json_length
    bin_data = b''
    bin_length = 0
    if bin_start < total_length:
        bin_length, = struct.unpack('<I', data[bin_start:bin_start+4])
        bin_type = data[bin_start+4:bin_start+8]
        if bin_type != b'BIN\0':
            raise ValueError("Second chunk is not BIN")
        bin_data = data[bin_start+8:bin_start+8 + bin_length]

    # Calculate new total length
    new_total = 12 + 8 + new_json_length + (8 + bin_length if bin_length > 0 else 0)

    # Write new GLB
    with open(output_path, 'wb') as f:
        f.write(b'glTF')
        f.write(struct.pack('<I', 2))
        f.write(struct.pack('<I', new_total))
        f.write(struct.pack('<I', new_json_length))
        f.write(b'JSON')
        f.write(new_json)
        if bin_length > 0:
            f.write(struct.pack('<I', bin_length))
            f.write(b'BIN\0')
            f.write(bin_data)

if __name__ == '__main__':
    if len(sys.argv) != 4:
        print("Usage: python update_glb.py <input.glb> <output.glb> <uri_prefix>")
        sys.exit(1)
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    new_uri_prefix = sys.argv[3]
    update_glb(input_path, output_path, new_uri_prefix) 