export default initialPath()

function initialPath() {
    let href = location.href
    let path = 'vin'
    if(realIncludes(href, '/histroy/parts')) {
        path = 'part'
    }else if(realIncludes(href, '/histroy/vin')) {
        path = 'vin'
    }else if(realIncludes(href, '/history/articles_oenumber_page')) {
        path = 'oe_part'
    }else if(realIncludes(href, '/history/articles_number_page')) {
        path = 'article_part'
    }
    return path
}

function realIncludes(string, substring) {
    return string.includes(substring)
}