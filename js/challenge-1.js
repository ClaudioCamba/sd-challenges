// Challenge module
const challenge1 = (() => {
  class Card {
    constructor(elem) {
      this.elem = elem;
      this.list = this.elem.querySelectorAll(".b24vno-4 > ul li");
      this.perNight = this.elem.querySelectorAll(".gr6dul-4.gTORJT > p")[0];
      this.perBroom = this.elem.querySelectorAll(".gr6dul-4.gTORJT > p")[1];
      this.discount = 20;
      this.room = this.getRoom();
      this.price = this.getPrice();
      this.currency = this.getCurrency();
      this.peroom = Math.round(this.price / this.room);
    }

    applyDisc(num, disc) {
      const discounted = (num / 100) * (100 - disc);
      return parseFloat(discounted.toFixed(1));
    }

    getRoom() {
      for (const li of this.list) {
        if (li.innerHTML.indexOf("bedroom") > -1) {
          return parseInt(li.innerText.split(" ")[0]);
        }
      }
    }

    getPrice() {
      let cleanPrice = this.perNight.querySelectorAll(".sc-16ewn0o-0.hEyBwM")[0].innerText;
      return parseInt(cleanPrice.replace(/\D/g, ""));
    }

    getCurrency(elem) {
      let currency = "";

      if (elem) {
        currency = elem;
      } else {
        currency = this.perNight.querySelectorAll(".sc-16ewn0o-0.hEyBwM")[0].innerText;
      }

      if (currency.indexOf("A$") > -1) {
        currency = "A$";
      } else if (currency.indexOf("£") > -1) {
        currency = "£";
      } else if (currency.indexOf("CA$") > -1) {
        currency = "CA$";
      } else if (currency.indexOf("€") > -1) {
        currency = "€";
      } else {
        currency = "$";
      }
      return currency;
    }

    addNightDiscount() {
      const discP = document.createElement("span");
      const current = document.createElement("span");
      const percent = document.createElement("span");
      const spanWrap = document.createElement("span");
      current.classList.add("cro-outline");
      discP.classList.add("cro-price");
      percent.classList.add("cro-percent");
      spanWrap.classList.add("cro-wrap");
      discP.innerText = this.currency + this.applyDisc(this.price, this.discount).toLocaleString("en") + " ";
      current.innerText = this.currency + this.price.toLocaleString("en");
      percent.innerText = " (-" + this.discount + "%)";

      let span = this.perNight.querySelectorAll(".sc-16ewn0o-0.hEyBwM")[0];
      span.classList.add("cro-hide");
      spanWrap.prepend(discP);
      spanWrap.appendChild(current);
      spanWrap.appendChild(percent);
      this.perNight.insertBefore(spanWrap, span);
    }

    addRoomDiscount(val) {
      let roomDisc = this.applyDisc(this.price, this.discount) / this.room;
      const discR = document.createElement("span");
      const current = document.createElement("span");
      const percent = document.createElement("span");
      current.classList.add("cro-r-outline");
      discR.classList.add("cro-r-price");
      percent.classList.add("cro-r-percent");
      roomDisc = parseFloat(roomDisc.toFixed(1).replace(".0", ""));
      discR.innerText = "approx " + this.currency + roomDisc.toLocaleString("en") + " ";
      current.innerText = this.currency + Math.round(this.price / this.room);
      percent.innerText = " (-" + this.discount + "%) / bedroom";
      if (val) {
        return [
          "approx " + this.currency + roomDisc.toLocaleString("en") + " ",
          this.currency + Math.round(this.price / this.room),
          " (-" + this.discount + "%) / bedroom",
        ];
      } else {
        this.perBroom.innerHTML = "";
        this.perBroom.prepend(discR);
        this.perBroom.appendChild(current);
        this.perBroom.appendChild(percent);
      }
    }
  }

  // Collect cards
  const getCards = () => {
    const cards = [];
    let prodCards = document.querySelectorAll("#APP_ROOT .b24vno-2.idQnsN");

    for (const card of prodCards) {
      cards.push(new Card(card));
    }
    return cards;
  };

  // Implement CRO amendments
  const implementDiscount = () => {
    const allCards = getCards(); // Store cards
    // Trigger class methods
    for (const card of allCards) {
      if (card.elem.querySelectorAll(".cro-price").length < 1) {
        card.addNightDiscount();
        card.addRoomDiscount();
      }
    }
  };

  // DOM observer to check when page makes changes
  const observeDOM = (function () {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    return function (obj, callback) {
      if (!obj || obj.nodeType !== 1) return;

      if (MutationObserver) {
        // define a new observer
        var mutationObserver = new MutationObserver(callback);

        // have the observer observe foo for changes in children
        mutationObserver.observe(obj, { childList: true, subtree: true });
        return mutationObserver;
      }

      // browser support fallback
      else if (window.addEventListener) {
        obj.addEventListener("DOMNodeInserted", callback, false);
        obj.addEventListener("DOMNodeRemoved", callback, false);
      }
    };
  })();

  // Mobile check
  const mobileCheck = () => {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  const updateCheck = () => {
    const cards = getCards();
    for (const card of cards) {
      const newP = card.elem.querySelector(".hEyBwM");
      const oldP = card.elem.querySelector(".cro-outline");
      const disP = card.elem.querySelector(".cro-price");
      const disR = card.elem.querySelector(".cro-r-price");
      const oldR = card.elem.querySelector(".cro-r-outline");

      if (newP.innerText !== oldP.innerText) {
        const roomVAl = card.addRoomDiscount("val");
        oldP.innerText = newP.innerText;
        disP.innerText = card.getCurrency(newP.innerText) + card.applyDisc(card.getPrice(), card.discount).toLocaleString("en") + " ";
        disR.innerText = roomVAl[0];
        oldR.innerText = roomVAl[1];
      }
    }
  };

  return { implementDiscount, observeDOM, mobileCheck, updateCheck };
})();

// Initial load / on Dom changes
document.addEventListener("readystatechange", (event) => {
  challenge1.observeDOM(window.document.body, function () {
    if (window.document.location.href.indexOf("www.onefinestay.com/search/") > -1) {
      let lengths = document.querySelectorAll(".cro-wrap").length < document.querySelectorAll(".gr6dul-4.gTORJT > p:first-child").length;
      let update = document.querySelectorAll(".idQnsN .hEyBwM").length === document.querySelectorAll(".idQnsN .cro-outline").length;

      // Add amendments when removed from page
      if (challenge1.mobileCheck() && lengths && !update) {
        challenge1.implementDiscount();
      }
      // Update pricing when currency updated
      let oldP = "";
      let newP = "";
      if (update && !lengths) {
        for (let i = 0; i < document.querySelectorAll(".idQnsN").length; i++) {
          if (document.querySelectorAll(".idQnsN .cro-outline").length > 0) {
            newP += document.querySelectorAll(".idQnsN .cro-outline")[i].innerText;
            oldP += document.querySelectorAll(".idQnsN .hEyBwM")[i].innerText;
          }
        }
        if (newP !== oldP) {
          challenge1.updateCheck();
        }
      }
    }
  });
});
