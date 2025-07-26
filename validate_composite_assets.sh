#!/bin/bash

echo "=== COMPOSITE ASSET REFERENCE VALIDATION ==="
echo ""

# Find all main.composite files
find . -name "main.composite" -not -path "./node_modules/*" | while read file; do
    echo "🔍 Checking: $file"
    
    # Get the scene directory
    scene_dir=$(dirname "$file" | sed 's|/assets/scene||' | sed 's|^./||')
    
    # Extract asset paths from the composite file
    grep -oE '"[^"]*\.(glb|gltf|png|mp3|wav)"' "$file" | tr -d '"' | while read asset_path; do
        if [ ! -z "$asset_path" ]; then
            # Check if the file exists relative to the scene
            full_path="$scene_dir/$asset_path"
            
            if [ ! -f "$full_path" ]; then
                echo "  ❌ BROKEN: $asset_path (expected at $full_path)"
                
                # Try to find the file in the scene
                filename=$(basename "$asset_path")
                found_file=$(find "$scene_dir" -name "$filename" -type f 2>/dev/null | head -1)
                
                if [ ! -z "$found_file" ]; then
                    # Calculate relative path from scene root
                    relative_path=$(echo "$found_file" | sed "s|^$scene_dir/||")
                    echo "    ✅ FOUND: $filename at $relative_path"
                    echo "    📝 FIX: Replace '$asset_path' with '$relative_path' in $file"
                else
                    echo "    ❌ NOT FOUND: $filename does not exist in $scene_dir"
                fi
            else
                echo "  ✅ OK: $asset_path"
            fi
        fi
    done
    echo ""
done

echo "=== END VALIDATION ==="
