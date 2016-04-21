var enbBemTechs = require('enb-bem-techs'),
    borschikTech = require('enb-borschik/techs/borschik'); 

module.exports = function (config) {
    var isProd = process.env.YENV === 'production';

    config.nodes('*.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [require('enb/techs/file-provider'), { target: '?.bemjson.js' }],
            [enbBemTechs.files],
            [enbBemTechs.deps],
            [enbBemTechs.bemjsonToBemdecl],
            // ie.css
            [require('enb-stylus/techs/stylus'), {
                target: '?.ie.css',
                sourceSuffixes: ['styl', 'ie.styl', 'css', 'ie.css'],
                autoprefixer: {
                    browsers: ['ie >= 10', 'last 2 versions', 'opera 12.1', '> 2%']
                }
            }],
            // ie8.css
            [require('enb-stylus/techs/stylus'), {
                target: '?.ie8.css',
                sourceSuffixes: ['styl', 'ie8.styl', 'css', 'ie8.css'],
                autoprefixer: {
                    browsers: ['ie >= 10', 'last 2 versions', 'opera 12.1', '> 2%']
                }
            }],
            // ie9.css
            [require('enb-stylus/techs/stylus'), {
                target: '?.ie9.css',
                sourceSuffixes: ['styl', 'ie9.styl', 'css', 'ie9.css'],
                autoprefixer: {
                    browsers: ['ie >= 10', 'last 2 versions', 'opera 12.1', '> 2%']
                }
            }],
            // bemtree
            [require('enb-bemxjst/techs/bemtree'), {
                sourceSuffixes: ['bemtree', 'bemtree.js']
            }],
            // node.js
            [require('enb-js/techs/node-js'), { includeYM: true }],
            // browser.js
            [require('enb-js/techs/browser-js'), { includeYM: true }],
            [require('enb/techs/file-merge'), {
                target: '?.js',
                sources: ['?.browser.js', '?.browser.bemhtml.js']
            }],
            // bemhtml
            [require('enb-bemxjst/techs/bemhtml'), {
                sourceSuffixes: ['bemhtml', 'bemhtml.js']
            }],
            // client bemhtml
            [enbBemTechs.depsByTechToBemdecl, {
                target: '?.bemhtml.bemdecl.js',
                sourceTech: 'js',
                destTech: 'bemhtml'
            }],
            [enbBemTechs.deps, {
                target: '?.bemhtml.deps.js',
                bemdeclFile: '?.bemhtml.bemdecl.js'
            }],
            [enbBemTechs.files, {
                depsFile: '?.bemhtml.deps.js',
                filesTarget: '?.bemhtml.files',
                dirsTarget: '?.bemhtml.dirs'
            }],
            [require('enb-bemxjst/techs/bemhtml'), {
                target: '?.browser.bemhtml.js',
                filesTarget: '?.bemhtml.files',
                sourceSuffixes: ['bemhtml', 'bemhtml.js']
            }],
            // html
            [require('enb-bemxjst/techs/bemjson-to-html')],
            // borschik
            [borschikTech, { sourceTarget: '?.css', destTarget: '?.min.css', tech: 'cleancss', freeze: true, minify: isProd }],
            [borschikTech, { sourceTarget: '?.ie.css', destTarget: '?.min.ie.css', freeze: true, minify: isProd }],
            [borschikTech, { sourceTarget: '?.ie8.css', destTarget: '?.min.ie8.css', freeze: true, minify: isProd }],
            [borschikTech, { sourceTarget: '?.ie9.css', destTarget: '?.min.ie9.css', freeze: true, minify: isProd }],
            [borschikTech, { sourceTarget: '?.bemtree.js', destTarget: '?.min.bemtree.js', freeze: true, minify: isProd }],
            [borschikTech, { sourceTarget: '?.node.js', destTarget: '?.min.node.js', freeze: true, minify: isProd }],
            [borschikTech, { sourceTarget: '?.js', destTarget: '?.min.js', freeze: true, minify: isProd }],
            [borschikTech, { sourceTarget: '?.bemhtml.js', destTarget: '?.min.bemhtml.js', freeze: true, minify: isProd }]
        ]);

        nodeConfig.addTargets([
            '?.min.css',
            '?.min.ie.css',
            '?.min.ie8.css',
            '?.min.ie9.css',
            '?.min.bemtree.js',
            '?.min.node.js',
            '?.min.js',
            '?.min.bemhtml.js',
            '?.html'
        ]);
    });
    
    config.nodes('*desktop.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [enbBemTechs.levels, {
                levels: [
                    { path: 'libs/bem-core/common.blocks', check: false },
                    { path: 'libs/bem-core/desktop.blocks', check: false },
                    { path: 'libs/bem-components/common.blocks', check: false },
                    { path: 'libs/bem-components/design/common.blocks', check: false },
                    { path: 'libs/bem-components/desktop.blocks', check: false },
                    { path: 'libs/bem-components/design/desktop.blocks', check: false },
                    'common.blocks',
                    'desktop.blocks'
                ]
            }],
            // css
            [require('enb-stylus/techs/stylus'), {
                target: '?.css',
                autoprefixer: {
                    browsers: ['ie >= 10', 'last 2 versions', 'opera 12.1', '> 2%']
                }
            }]
        ]);
    });
    config.nodes('*touch-pad.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [enbBemTechs.levels, {
                levels: [
                    { path: 'libs/bem-core/common.blocks', check: false },
                    { path: 'libs/bem-core/touch.blocks', check: false },
                    { path: 'libs/bem-components/common.blocks', check: false },
                    { path: 'libs/bem-components/design/common.blocks', check: false },
                    { path: 'libs/bem-components/touch.blocks', check: false },
                    { path: 'libs/bem-components/design/touch.blocks', check: false },
                    { path: 'libs/bem-components/touch-pad.blocks', check: false },
                    { path: 'libs/bem-components/design/touch-pad.blocks', check: false },
                    'common.blocks',
                    'touch.blocks',
                    'touch-pad.blocks'
                ]
            }],
            // css
            [require('enb-stylus/techs/stylus'), {
                target: '?.css',
                autoprefixer: {
                    browsers: ['android 4', 'ios 5']
                }
            }]
        ]);
    });
    config.nodes('*touch-phone.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [enbBemTechs.levels, {
                levels: [
                    { path: 'libs/bem-core/common.blocks', check: false },
                    { path: 'libs/bem-core/touch.blocks', check: false },
                    { path: 'libs/bem-components/common.blocks', check: false },
                    { path: 'libs/bem-components/design/common.blocks', check: false },
                    { path: 'libs/bem-components/touch.blocks', check: false },
                    { path: 'libs/bem-components/design/touch.blocks', check: false },
                    { path: 'libs/bem-components/touch-phone.blocks', check: false },
                    { path: 'libs/bem-components/design/touch-phone.blocks', check: false },
                    'common.blocks',
                    'touch.blocks',
                    'touch-phone.blocks'
                ]
            }],
            // css
            [require('enb-stylus/techs/stylus'), {
                target: '?.css',
                autoprefixer: {
                    browsers: ['android 4', 'ios 6', 'ie 10']
                }
            }]
        ]);
    });
};


