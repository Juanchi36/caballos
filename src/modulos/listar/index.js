import Handlebars from 'handlebars';

import template from './template.html';

let database;

let caballos = [];

export default (_database) => {
	database = _database;
	caballos = [];
	listarCaballos();
};

const listarCaballos = () => {
	const lista = database
		.ref('/caballos')
		.once('value')
		.then((datos_caballos) => {
			datos_caballos.forEach((element) => {
				const datosCaballos = element.val();
				datosCaballos.id = element.key;
				caballos.push(datosCaballos);
			});

			render();
		});
};

const mostrarFoto = (caballo) => {
	database
		.ref(`bares/${bar.id}`)
		.remove()
		.then(() => {
			mensaje = '📢 Cervecería eliminada';
			bares = [];
			document.getElementById('main').innerHTML = '';
			render();
		})
		.catch(() => {
			mensaje = '⛔ Solo el administrador puede eliminar una cervecería';
			render();
		});
	listarBares();
};

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({ caballos });
	const caballoClase = document.getElementsByClassName('foto-caballo');
	for (let i = 0; i < caballoClase.length; i++) {
		caballoClase[i].addEventListener(
			'click',
			function () {
				//mostrarFoto(this);
				console.log(caballoClase[i]);
			},
			false
		);
	}
};
