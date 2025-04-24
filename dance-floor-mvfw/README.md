# MVFW Dance Floor Example

Example scene of this module for the animated dance floor on Metaverse Fashion Week 2025.

### Quick Start

Place the contents of the folder modules/grid-floor in your project

```javascript
      DiscoManager.getInstance()
```

You can edit the dance floor position in modules/grid-floor/discoManager.ts
```javascript
        // -- Spawn Grid --
        this.grid = createGrid({
            position: Vector3.create(8,0.1,8)
        }, 14, 14, Quaternion.fromEulerDegrees(0,0,0))
```

The disco floor has 2 modes, On and Off, you can change between them with
```javascript
      DiscoManager.getInstance().startDisco()
```
and
```javascript
      DiscoManager.getInstance().stopDisco()
```