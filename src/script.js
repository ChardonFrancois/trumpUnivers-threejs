import { AxesHelper, BoxBufferGeometry, BoxGeometry, BufferGeometry, Clock, Float32BufferAttribute, MathUtils, Mesh, MeshBasicMaterial, PerspectiveCamera, Points, PointsMaterial, Scene, TextureLoader, WebGLRenderer } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import allTrump from '../public/trumpiYeahh.png'
import trump from '../public/trumpT.png'
import './style.css'

const textureLoader = new TextureLoader()
const allHeadTrump = textureLoader.load(allTrump);

const textureTrump = new TextureLoader();
const headTrump = textureTrump.load(trump);

const scene = new Scene();
const count = 400; 
const distance = 15; 


// scene.add(new AxesHelper());

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight,
    0.01,
    1000
);
camera.position.set(0.5, 0.5, 3);
scene.add(camera)

const points = new Float32Array(count * 3)
for(let i = 0; i < points.length; i++){
    points[i] = MathUtils.randFloatSpread(distance * 2)
    points[i + 1] = 1
    points[i + 2] = 1
}

const head = new BoxGeometry(1.2,1.2,1.2);
const materialHead = new MeshBasicMaterial({
    map: headTrump,
    alphaTest: 0.5,
    transparent: true,
    
});


const meshHead = new Mesh(head,materialHead);
meshHead.position.y = .5;
meshHead.position.x = .5;
scene.add(meshHead);

const geometry = new BufferGeometry();
geometry.setAttribute('position', new Float32BufferAttribute(points, 3))
const pointsMaterial = new PointsMaterial({
    
    size: 1,
    map: allHeadTrump,
    alphaTest: .5,
    transparent: true,
});
const pointsObject = new Points(geometry, pointsMaterial);
scene.add(pointsObject);


const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    
    
});
renderer.setClearColor(0x000000, 0)
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

//const controls = new OrbitControls(camera, renderer.domElement)

const clock = new Clock();

let mouseX = 0;
window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
})

function tick(){
    const time = clock.getElapsedTime();
    renderer.render(scene, camera);
    // controls.update();
    requestAnimationFrame(tick);

    const ratio = (mouseX / window.innerWidth - 0.5) * 2;  

    
    
    pointsObject.rotation.y = ratio * Math.PI * 0.2;
    pointsObject.rotation.x = time * Math.PI *.03;
    

}
tick()

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth /window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})