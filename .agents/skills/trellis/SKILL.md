---
name: trellis
description: |
  Official skill for Microsoft TRELLIS - Structured 3D Latents for Scalable and Versatile 3D Generation.
  Use when generating 3D models (.glb, .obj), 3D Gaussian Splats (.ply), or radiance fields from 2D images
  or text prompts. Covers local pipeline execution, Hugging Face Gradio API client inference, and 
  seamless web embedding using Three.js or Google Model-Viewer. Triggers on: "trellis", "microsoft trellis",
  "trellis 3d", "image to 3d", "generate 3d model", "convert image to 3d", "3d mesh generation", 
  "gaussian splatting", "text to 3d".
---

# Microsoft TRELLIS 3D Generation Skill

[TRELLIS](https://github.com/microsoft/TRELLIS) is Microsoft's state-of-the-art 3D asset foundation model. It transforms single or multi-view 2D images and text prompts into production-grade 3D assets:
- **3D Meshes** (`.glb`, `.obj` with PBR textures)
- **3D Gaussian Splatting** (`.ply` point clouds for real-time rasterization)
- **Radiance Fields / NeRF**

---

## 1. System Requirements & Execution Modes

### Hardware Reality
- **Local Native Pipeline:** Requires Linux with an **NVIDIA GPU (>= 16GB VRAM)**, CUDA Toolkit (11.8 or 12.2), and compiled C++/CUDA kernels (`flash-attn`, `xformers`, `spconv`, `nvdiffrast`, `kaolin`).
- **macOS / Cloud / API Mode (Recommended for Mac users):** Run inference remotely via the official Hugging Face Spaces Gradio API (`gradio_client`), eliminating the need for local NVIDIA GPUs.

---

## 2. Remote Inference via Gradio API (`gradio_client`)

For environments without an NVIDIA GPU (e.g. macOS), generate 3D assets directly through the Hugging Face TRELLIS space:

```bash
pip install gradio_client
```

### Python Script: Generate `.glb` from Image
```python
import os
from gradio_client import Client, handle_file

# Initialize client pointing to Microsoft's TRELLIS space
client = Client("Microsoft/TRELLIS")

def generate_3d_from_image(image_path: str, output_glb_path: str = "output.glb"):
    print(f"Uploading and processing {image_path} with TRELLIS...")
    
    # 1. Preprocess image
    result = client.predict(
        image=handle_file(image_path),
        api_name="/preprocess_image"
    )
    
    # 2. Run 3D Generation (SLAT Diffusion)
    # Returns 3D representations and extracted GLB
    generation_result = client.predict(
        api_name="/image_to_3d"
    )
    
    # 3. Download the generated GLB
    # Check outputs and save locally
    print(f"3D generation complete: {generation_result}")
    return generation_result

if __name__ == "__main__":
    generate_3d_from_image("assets/images/logo.png", "assets/models/logo-3d.glb")
```

---

## 3. Local Native Pipeline Execution (NVIDIA CUDA Linux)

When running on an NVIDIA GPU workstation or server:

```python
import os
os.environ['SPCONV_ALGO'] = 'native'

from PIL import Image
from trellis.pipelines import TrellisImageTo3DPipeline
from trellis.utils import render_utils, postprocessing_utils

# 1. Load Pretrained Weights (TRELLIS-image-large: 1.2B params)
pipeline = TrellisImageTo3DPipeline.from_pretrained("microsoft/TRELLIS-image-large")
pipeline.cuda()

# 2. Input Image
image = Image.open("input.png").convert("RGBA")

# 3. Run Pipeline
outputs = pipeline.run(
    image,
    seed=42,
    sparse_structure_sampler_params={"steps": 12, "cfg_strength": 7.5},
    slat_sampler_params={"steps": 12, "cfg_strength": 3.0}
)

# 4. Export Production .GLB Mesh
glb = postprocessing_utils.to_glb(
    outputs['gaussian'][0],
    outputs['mesh'][0],
    simplify=0.90,       # Decimate triangles (0.9 = 90% reduction for lightweight web models)
    texture_size=1024     # Web-optimized texture resolution
)
glb.export("model.glb")

# 5. Export 3D Gaussian Splatting (.ply)
outputs['gaussian'][0].save_ply("model.ply")
```

---

## 4. Embedding Generated 3D Models in Web & Portfolio Applications

### A. Modern Lightweight Viewer (`@google/model-viewer`)
Zero-boilerplate, responsive 3D viewer with lighting, auto-rotation, and interaction:

```html
<!-- CDN Import in <head> -->
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>

<!-- 3D Component -->
<div class="canvas-3d-wrapper">
  <model-viewer
    src="assets/models/logo-3d.glb"
    alt="Ilyas Ennajy 3D Logo Emblem"
    auto-rotate
    rotation-per-second="25deg"
    camera-controls
    shadow-intensity="1.5"
    exposure="1.2"
    environment-image="neutral"
    interaction-prompt="none"
    style="width: 100%; height: 400px; background: transparent;"
  ></model-viewer>
</div>
```

### B. Custom Interactive Three.js Integration
For advanced scene compositing, particle integration, and post-processing:

```javascript
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function mountTrellisViewer(containerId, glbPath) {
  const container = document.getElementById(containerId);
  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 3.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = false;

  // Studio Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0x00e5ff, 2.5);
  dirLight.position.set(2, 4, 3);
  scene.add(dirLight);

  // Load Model
  const loader = new GLTFLoader();
  loader.load(glbPath, (gltf) => {
    const model = gltf.scene;
    // Center bounding box
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    scene.add(model);

    // Continuous float animation
    function animate() {
      requestAnimationFrame(animate);
      model.rotation.y += 0.008;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  });
}
```

---

## 5. Workflow Rules for Portfolios
1. **Model Optimization:** Keep `.glb` files under 2-4MB for instant web loading without blocking LCP.
2. **Graceful Fallback:** Always provide a high-resolution 2D WebP/PNG badge as a poster/fallback if WebGL is disabled or slow.
3. **Passive Controls:** Disable scroll-hijacking zoom (`controls.enableZoom = false`) when embedding models in scrollable pages.
