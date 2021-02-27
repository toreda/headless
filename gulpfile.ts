import {EventEmitter} from 'events';
import {series, src} from 'gulp';
import {ArmorBuild} from '@armorjs/build';

const build: ArmorBuild = new ArmorBuild(new EventEmitter());
const eslint = require('gulp-eslint');

function runLint(): any {
	return (
		src(['src/**'])
			// eslint() attaches the lint output to the "eslint" property
			// of the file object so it can be used by other modules.
			.pipe(eslint())
			// eslint.format() outputs the lint results to the console.
			// Alternatively use eslint.formatEach() (see Docs).
			.pipe(eslint.format())
			// To have the process exit with an error code (1) on
			// lint error, return the stream and pipe to failAfterError last.
			.pipe(eslint.failAfterError())
	);
}

function createDist() {
	return build.create.dir('./dist', false);
}

function cleanDist() {
	return build.clean.dir('./dist');
}

function buildSrc() {
	return build.run.typescript('./dist', 'tsconfig.json');
}

exports.default = series(createDist, cleanDist, runLint, buildSrc);
