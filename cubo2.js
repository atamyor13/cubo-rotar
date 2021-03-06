//Este es el codigo´para crear un cubo que rota con unas esferas
//Creado por Alejandra Tamayo Rivera
//Fecha:29/04/2020
var renderer;
	var scene;
	var camera;
	function init() {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(45, window.innerWidth /
		window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer();
		renderer.setClearColor(0x000000, 1.0);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.physicallyCorrectLights = true;
		//Gama input para que se queden sombre el objeto
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		//Mapa de la sombra
		renderer.shadowMap.enabled = true;
		//tono
		renderer.toneMapping = THREE.ReinhardToneMapping;
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		var planeGeometry = new THREE.PlaneGeometry(20, 20);
		var planeMaterial = new THREE.MeshLambertMaterial({color: 0x6E0050});
		var plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.receiveShadow = true;
		//Para que rote circularmente
		//Pi libreria de java 
		plane.rotation.x = -0.5 * Math.PI;
		//El plano se coloca un poco desplazada
		plane.position.x = 0;
		plane.position.y = -2;
		plane.position.z = 0;
		scene.add(plane);
		var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
		var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x000000,
		transparent:true, opacity:0.7});
		var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
		cube.castShadow=true;
		scene.add(cube);
		camera.position.x = 15;
		camera.position.y = 16;
		camera.position.z = 13;
		camera.lookAt(scene.position);
		//luz blanca
		var ambient = new THREE.AmbientLight(0xffffff,0.3);
		scene.add(ambient);
		var light = new THREE.DirectionalLight(0xffffff, 1, 100, 2 );
		light.position.set(10,20 , 20);
		light.castShadow = true;
		scene.add(light);
		document.body.appendChild(renderer.domElement);
		addVertices(cube);
		render();
}
function addVertices(mesh) {
	var vertices = mesh.geometry.vertices;
	var vertexMaterial = new THREE.MeshPhongMaterial({color: 0xFFFB00});
	vertices.forEach(function (vertex) {
		var vertexSphere = new THREE.SphereGeometry(0.15);
		var vertexMesh = new THREE.Mesh(vertexSphere, vertexMaterial);
		vertexMesh.position.copy(vertex);
		scene.add(vertexMesh);
	});
}
function render() {
	var rotSpeed = 0.01;
	camera.position.x = camera.position.x * Math.cos(rotSpeed) +
	camera.position.z * Math.sin(rotSpeed);
	camera.position.z = camera.position.z * Math.cos(rotSpeed) -
	camera.position.x * Math.sin(rotSpeed);
	camera.lookAt(scene.position);
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
function handleResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("DOMContentLoaded", function(event) {
	init();
});
window.addEventListener('resize', handleResize, false);
//Cambiarle el color a todoo
//cubo menos transparente
//sombra mas oscura