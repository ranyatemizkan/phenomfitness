(function () {
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

  function loadScript() {
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }

  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'phy9ye-ug.myshopify.com',
      storefrontAccessToken: 'd041f3c2e4a0afe384074f5ebc6afb1c',
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent('product', {
        id: '9598969086182',
        node: document.getElementById('product-component-1780429834427'),
        moneyFormat: '%24%7B%7Bamount%7D%7D',
        options: {
          "product": {
            "styles": {
              "product": {
                "@media (min-width: 601px)": {
                  "max-width": "calc(25% - 20px)",
                  "margin-left": "20px",
                  "margin-bottom": "50px"
                }
              },
              "button": {
                ":hover": { "background-color": "#b4596e" },
                "background-color": "#c8637a",
                ":focus": { "background-color": "#b4596e" }
              }
            },
            "text": { "button": "Add to cart" }
          },
          "productSet": {
            "styles": {
              "products": {
                "@media (min-width: 601px)": { "margin-left": "-20px" }
              }
            }
          },
          "modalProduct": {
            "contents": {
              "img": false,
              "imgWithCarousel": true,
              "button": false,
              "buttonWithQuantity": true
            },
            "styles": {
              "product": {
                "@media (min-width: 601px)": {
                  "max-width": "100%",
                  "margin-left": "0px",
                  "margin-bottom": "0px"
                }
              },
              "button": {
                ":hover": { "background-color": "#b4596e" },
                "background-color": "#c8637a",
                ":focus": { "background-color": "#b4596e" }
              }
            },
            "text": { "button": "Add to cart" }
          },
          "option": {},
          "cart": {
            "styles": {
              "button": {
                ":hover": { "background-color": "#b4596e" },
                "background-color": "#c8637a",
                ":focus": { "background-color": "#b4596e" }
              }
            },
            "text": { "total": "Subtotal", "button": "Checkout" }
          },
          "toggle": {
            "styles": {
              "toggle": {
                "background-color": "#c8637a",
                ":hover": { "background-color": "#b4596e" },
                ":focus": { "background-color": "#b4596e" }
              }
            }
          }
        }
      });
    });
  }

  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
})();
