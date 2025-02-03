import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


/*---------- BASIC SETUP ----------*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(0);




/*---------- LAGER EN SHAPE -----------*/

// GJERRY FRA SIA

const gjerryTexture = new THREE.TextureLoader().load('gjerryfrasia.JPG')
const gjerry = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 20),
    new THREE.MeshBasicMaterial( {map: gjerryTexture} )
)

// DRAGEN
const dragenTexture = new THREE.TextureLoader().load('dragentrynet.JPG')
const dragen = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10), 
    new THREE.MeshBasicMaterial({ map: dragenTexture })
);

// GJERRY I SKOGEN

const gskogenTexture = new THREE.TextureLoader().load('gjerryskogen.JPG')
const gjerrySkogen = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 20),
    new THREE.MeshBasicMaterial( {map: gskogenTexture} )
)

// UTSIKT FEAT ANDREA

const utsiktTexture = new THREE.TextureLoader().load('utsikt.JPG')
const utsikt = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 20),
    new THREE.MeshBasicMaterial( {map: utsiktTexture} )
)

// GJERRY TRYNET

const gtrynetTexture = new THREE.TextureLoader().load('gjerrytrynet.JPG')
const gjerryTrynet = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 20),
    new THREE.MeshBasicMaterial( {map: gtrynetTexture} )
)

gjerry.position.x = -20
gjerry.position.z = 0


dragen.position.x = -20
dragen.position.y = -2
dragen.position.z = 60

gjerrySkogen.position.x = 20
gjerrySkogen.position.z = 40

utsikt.position.x = 20
utsikt.position.y = -5
utsikt.position.z = 100

gjerryTrynet.position.x = 20
gjerryTrynet.position.z = -20

scene.add(gjerry, dragen, gjerrySkogen, utsikt, gjerryTrynet)


/*---------- SCROLLFUNKSJON -----------*/

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    camera.position.z = t * -0.03;
    camera.position.x -= 0.0002;
    camera.rotation.y -= 0.0002;
    
  }
  
document.body.onscroll = moveCamera;
moveCamera();




/*---------- GRIDHELPER OG ORBITCONTROL -----------*/

const gridhelper = new THREE.GridHelper(200, 50)
scene.add( gridhelper )


const control = new OrbitControls( camera, renderer.domElement );


const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

/*---------- LAGER EN FUNKSJON SLIK AT PLANEOBJEKT FØLGER MUSEPEKEREN -----------*/

// Set initial rotation values for plane object
let planeRotation = new THREE.Euler(0, 0, 0);

// Add mousemove event listener to update plane's rotation based on mouse position
window.addEventListener('mousemove', (event) => {
  // Convert mouse position to a value between -1 and 1 in relation to screen size
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

  // Create new Euler rotation value based on mouse position
  const newRotation = new THREE.Euler(-mouseY, mouseX, 0);

  // Update plane rotation with new values
  planeRotation.copy(newRotation);
});


/*---------- FUNKSJON SOM HELE TIDEN OPPDATERER SKJERMEN -----------*/
function animate() {
    requestAnimationFrame( animate );

    gjerry.rotation.copy(planeRotation)
    dragen.rotation.copy(planeRotation)
    utsikt.rotation.copy(planeRotation)
    gjerryTrynet.rotation.copy(planeRotation)
    gjerrySkogen.rotation.copy(planeRotation)





    control.update()

    renderer.render( scene, camera );
  }
  
animate();