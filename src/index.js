import Navigo from 'navigo';
import firebase from 'firebase';
import catchLinks from 'catch-links';

import listar from './modulos/listar';
import nuevo from './modulos/nuevo';

import firebaseConfig from '../firebase.config';

import './index.scss';

firebase.initializeApp(firebaseConfig);

const database = firebase.database();


var root = null;
var useHash = false;

var router = new Navigo(root, useHash);

router
	.on({
		'listar': () => listar(database),
		'nuevo': () => nuevo(database),
	})
	.resolve();


catchLinks(window, function (href) {
    router.navigate(href);
});