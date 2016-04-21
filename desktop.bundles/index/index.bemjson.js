({
    block: 'page',
    title: 'Hello, World!',
    styles: [
        { elem: 'css', url: 'index.min.css' },
        '<!--[if IE]>',
            { elem: 'css', url: 'index.min.ie.css' },
        '<![endif]-->',
        '<!--[if IE 8]>',
            { elem: 'css', url: 'index.min.ie8.css' },
        '<![endif]-->',
        '<!--[if IE 9]>',
            { elem: 'css', url: 'index.min.ie9.css' },
        '<![endif]-->'
    ],
	head: [
		{ elem: 'meta', attrs: { name: 'description', content: ''}},
		{ elem: 'css', url: 'index.min.css'}
	],
    scripts: [
        { elem: 'js', url: 'index.min.js' }
    ],
    content: [
	{
		block: 'head',
		content: {
			block: 'layout',
			content: [
				{
					elem: 'left',
					content: 'left here'
				},
				{
					elem: 'right',
					content: {
						block: 'logo',
						content: [
							{
								block: 'image',
								attrs: { src: 'http://varya.me/online-shop-dummy/desktop.blocks/b-logo/b-logo.png'}
							},
							{
								elem: 'slogan',
								content: 'Nata'
							}
						]
					}
				}
			]
		}
	}
    ]
});

