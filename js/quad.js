var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
var camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientWidth, 1, 1000);
var clock = new THREE.Clock();

var uniforms = {
  iTime: {type: "f", value: 0 }
};

var quad = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertex-shader').textContent,
    fragmentShader: document.getElementById('fragment-shader').textContent,
    depthWrite: false,
    depthTest: false
  })
);
scene.add(quad);

camera.position.z = 200;

render();

function render() {
  requestAnimationFrame(render);
  
  if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth /  canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  
  var dt = clock.getDelta();

  uniforms.iTime.value += dt;
  
  renderer.render(scene, camera);
}
