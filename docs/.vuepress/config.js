module.exports = {
    title: '小韭菜前端之路',    // 设置网站标题
    description: 'Hello, my friend!',
    themeConfig : {
        logo: '/assets/img/logo.jpg',
        nav : [
            { text: '主页', link: '/' },
            { 
                text: '技术笔记',
                link: '/note',
                items: [
                  { text: 'javascript', link: '/note/javascript/' },
                  { text: 'node', link: '/note/node/' },
                  { text: '经典面试题集合', link: '/note/interview/' },
                  { text: '必会手写集合', link: '/note/write/' },
                  { text: '前端设计模式', link: '/note/designPatterns/' },
                ]
            },
            { 
                text: '开源项目',
                link: '/openSourceProject',
                items: [
                  { text: 'web小游戏', link: '/openSourceProject/webGame/' },
                  { text: '炸裂的特效', link: '/openSourceProject/specialEffects/' }
                ]
            },
            { text: '关于我', link: '/about' },
        ],
        sidebar: {
            '/note/javascript/': [
                '',
                {
                  title: 'javascript 概述',
                  path: '/note/javascript/basics',
                },
                {
                    title: '执行环境',
                    path: '/note/javascript/science'
                },
                {
                    title: '快速入门',
                    path: '/note/javascript/introduction/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/note/javascript/introduction/grammar',
                        '/note/javascript/introduction/variable',
                        '/note/javascript/introduction/dataType',
                        '/note/javascript/introduction/operator',
                        '/note/javascript/introduction/processControl',
                        '/note/javascript/introduction/object',
                        '/note/javascript/introduction/function',
                        '/note/javascript/introduction/Array',
                        '/note/javascript/introduction/error',
                        '/note/javascript/introduction/supplement',
                    ]
                },
                {
                    title: '核心内容',
                    path: '/note/javascript/core/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                    ]
                },
                {
                    title: 'ES6',
                    path: '/note/javascript/ES6/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/note/javascript/ES6/class',
                        '/note/javascript/ES6/proxy',
                        '/note/javascript/ES6/symbol',
                        '/note/javascript/ES6/Decorator',
                        '/note/javascript/ES6/setMap',
                    ]
                },
            ],
            '/note/interview/': [
                '',
                {
                    title: 'javascript篇',
                    path: '/note/interview/javascript/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '/note/interview/javascript/variable',
                        '/note/interview/javascript/fn',
                        '/note/interview/javascript/prototype',
                        '/note/interview/javascript/algorithm',
                    ]
                },
            ],
            '/note/write/': [
                '',
                '/note/write/promise',
                '/note/write/call'
            ],
            '/note/designPatterns/': [
                '',
                {
                    title: '发布订阅（Pub-Sub）',
                    path: '/note/designPatterns/pubSub',
                },
            ]
        },
    },
    dest: './docs/.vuepress/dist',
}
