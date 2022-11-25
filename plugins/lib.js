const path = require('path');
const fsExtra = require('fs-extra');


const asserts = [{
	name: 'element-ui',
	resources: {
		'lib/index.js': 'index.js',
		'lib/theme-chalk/index.css': 'index.css',
		'lib/theme-chalk/fonts': 'fonts'
	},
},{
	name: 'vue',
	resources: {
		'dist/vue.min.js': 'index.min.js'
	},
},{
	name: 'lodash',
	resources: {
		'lodash.min.js': 'lodash.min.js'
	},
}];

/**
*
*/
function prepareLib(target, distDir, modulesDir) {
	console.log('prepareLib', target)
	console.log('prepareLib', distDir, modulesDir)
	const nodeModules = modulesDir;

	const name = target.name;
	const packageJson = require(path.resolve(nodeModules, `${name}/package.json`));
	const version = packageJson.version;
	const relativePath = [];
	Object.keys(target.resources).forEach(key => {
		const src = path.join(nodeModules, name, key);
		const dist = path.join(distDir, name, version, target.resources[key]);
		fsExtra.copy(src, dist).catch(err => {
			console.error(err);
		});
		relativePath.push(path.relative(distDir, dist));
	});
	console.log(`Lib ${name} resources copied!`)
	return relativePath;
};

function copyLibs(distDir, libs, modulesDir) {
	let result = [];
	asserts.filter(item => {
		return libs.includes(item.name);
	}).forEach((assert) => {
		result = result.concat(prepareLib(assert, distDir, modulesDir));
	});
	return result;
}

function getResources(distDir, libs, modulesDir) {
	const result = copyLibs(distDir, libs, modulesDir);
	const cssReg = /\.css$/;
	const jsReg = /\.js$/;

	// css 排在前面
	result.sort((a, b) => {
		if (cssReg.test(a)) {
			return -1;
		}
		return 1
	});
	return result.map(item => {
		const res = {};
		if (cssReg.test(item)) {
			res.css = item;
		} else if(jsReg.test(item)) {
			res.js = item;
		}
		return res;
	})
}

function createLibs({distDir, libs, modulesDir}) {
	return getResources(distDir, libs, modulesDir);
}

module.exports = createLibs