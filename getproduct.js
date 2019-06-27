const promise = require('request-promise')
const cheerio = require('cheerio')
const selector = require('./selectors.js')

getproduct = (uri) => {
    const getPage = {
        uri,
        transform: body => {
          return cheerio.load(body)
        }
    }

    promise(getPage).then($ => {
        let breadcrumArray = [];
        $(selector.breadcrumb).each((i, item) => {
            breadcrumArray.push($(item).text())
        })
        let product = {
            id: parseInt($(selector.id).text().replace(/[^0-9-]+/g,"")),
            breadcrumb: breadcrumArray,
            name: $(selector.name).text(),
            img: $(selector.img).find('img').attr('src'),
            seller: $(selector.seller[0]).find(selector.seller[1]).text(),
            price: _formatPrice($(selector.price[0]).find(selector.price[1]).text())
        }
        console.log(product)
    }).catch((err) => {
        console.log(err)
    })

    _formatPrice = price => {
        let number = price.replace('.', '')
        number = number.replace(',', '.')
        return parseFloat(number.replace(/[^0-9.-]+/g,"")) 
    }
}

module.exports = getproduct
