import Handlebars from 'handlebars';
import { guid } from '../../utils';
import firebase from 'firebase';
import template from './template.html';

let mensaje = '';
let downloadUrl = null;
let database;

export default (_database) => {
	database = _database;
	render();
};

const crearNuevoCaballo = (e) => {
	e.preventDefault();

	const caballo = {
		id: guid(),
		nombre: document.getElementById('nombre').value,
		raza: document.getElementById('raza').value,
		anios: document.getElementById('edad').value,
		url: downloadUrl
	};
	console.log(caballo);
	database
		.ref(`caballos/${caballo.id}`)
		.set({
			nombre: caballo.nombre,
			raza: caballo.raza,
			anios: caballo.anios,
			url: caballo.url
		})
		.then(() => {
			mensaje = 'Caballo creado correctamente!';
			render();
		});

	return false;
};

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({ mensaje });
	document.getElementById('boton-nuevo').onclick = crearNuevoCaballo;
	document.getElementById('fileInput').onchange = (event) => {
		event.preventDefault();
		const image = event.target.files[0];
		const refStorage = firebase.storage().ref(`/fotos/${image.name}`);
		let uploadTask = refStorage.put(image);
		uploadTask.on(
			'state_changed',
			null,
			(error) => {
				console.log('Error al subir el archivo', error);
			},
			() => {
				uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
					downloadUrl = downloadURL;
				});
			}
		);
	};
};
