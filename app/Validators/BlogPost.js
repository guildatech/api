const Antl = use('Antl')

class BlogPost {
    get validateAll() {
        return true
    }

    get rules() {
        return {
            post_title: 'required',
            post_body: 'required',
        }
    }

    get messages() {
        return Antl.list('validation')
    }
}

module.exports = BlogPost
