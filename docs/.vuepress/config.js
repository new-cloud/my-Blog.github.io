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
                    ]
                },
                {
                    title: 'ES6',
                    path: '/note/javascript/ES6/',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
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
                    ]
                },
            ],
            '/note/write/': [
                '',
                '/note/write/promise'
            ]
        },
    },
    dest: './docs/.vuepress/dist',
}
