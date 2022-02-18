module.exports = function (/** @type {import('plop').NodePlopAPI} */ plop) {
  // controller generator
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'path',
        message: 'slug',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'mdx/{{path}}.mdx',
        templateFile: 'plop-template.hbs'
      },
    ],
  })
}
