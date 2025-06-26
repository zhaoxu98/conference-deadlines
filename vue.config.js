module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Personal Conference Deadlines',
        }
    },
    publicPath: process.env.NODE_ENV === 'production' 
        ? './' 
        : '/'
}