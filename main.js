// import './style.css'

import * as THREE from 'three'



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg')
});

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30)
camera.position.setX(-3)
// renderer.render(scene, camera)


const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color: 0xFF3643})
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,0, 10)

const ambientLight = new THREE.AmbientLight(0xffffff)


// const gridHelper = new THREE.GridHelper(200, 50)

scene.add(pointLight, ambientLight, )

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)
  
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));


  star.position.set(x,y,z)
  scene.add(star)

}

Array(200).fill().forEach(addStar)

const woodTexture = new THREE.TextureLoader().load('assets/killerqueen.png');
scene.background = woodTexture

const prayasTexture = new THREE.TextureLoader().load('assets/pfp.jpg')

const prayas = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: prayasTexture})
)


scene.add(prayas)

const jojoTexture = new THREE.TextureLoader().load('assets/fightin-gold.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({map: jojoTexture})
)



scene.add(moon)

moon.position.z = 60;
moon.position.setX(-10)
// moon.position.setY()

prayas.position.z = -5;
prayas.position.x = 2;



const jojoPng = new THREE.TextureLoader().load('assets/jojo.png')
const jojoCube = new THREE.BoxGeometry(5,5,5)


const jojoMaterial = new THREE.MeshBasicMaterial({map: jojoPng, transparent: true})

const jojoWalking = new THREE.Mesh(jojoCube, jojoMaterial)

scene.add(jojoWalking)

const dioTexture = new THREE.TextureLoader().load('assets/dio.png')

const dioWalking =  new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: dioTexture, transparent: true})
)

scene.add(dioWalking)

dioWalking.position.z = 60
dioWalking.position.x = 30

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // moon.rotation.x += 0.05;
  moon.rotation.y += 0.045;
  // moon.rotation.z += 0.05;

  prayas.rotation.y += 0.01;
  prayas.rotation.z += 0.01;


  jojoWalking.position.z = 25;
  jojoWalking.rotation.x = 30;

  dioWalking.position.z = 40;
  dioWalking.position.x = 0;
  // dioWalking.position.z = 30;
  

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}



document.body.onscroll = moveCamera;
moveCamera();







function animate() {
  requestAnimationFrame( animate )
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // moon.rotation.x += 0.005;

  // controls.update()

  renderer.render(scene, camera)
}

animate()