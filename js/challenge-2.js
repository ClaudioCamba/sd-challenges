"use strict";
// Store location script =================================
const storeSearch = (() => {
  let searches = [],
    key = "challenge2";

  // Check local storage for key
  const getLSVal = () => {
    if (key in localStorage) {
      searches = JSON.parse(localStorage.getItem(key));
    }
  };

  // Get search values
  const getSearches = () => searches;

  // Set LocalStorage Values
  const setLSVal = () => localStorage.setItem(key, JSON.stringify(searches));

  // URL check if its search page
  const checkUrl = () => document.location.pathname.split("/").length >= 4 && document.location.pathname.indexOf("search") > -1;

  const checkBeforeAdd = () => {
    let index = null;
    // Check if already exists
    for (let i = 0; i < searches.length; i++) {
      if (searches[i].path.split("/")[2] === document.location.pathname.split("/")[2]) {
        index = i;
        break;
      }
    }

    // Add or update existing location
    if (index === null) {
      searches.unshift({ path: window.document.location.pathname, url: window.document.location.href });
    } else {
      searches[index] = { path: window.document.location.pathname, url: window.document.location.href }; // Replace with updated url

      // Move to start of array
      const location = searches.splice(index, 1)[0];
      searches.splice(0, 0, location);
    }

    setLSVal();
  };

  return { getLSVal, checkUrl, getSearches, checkBeforeAdd };
})();

// Homepage component builder =================================
const buildLoc = (() => {
  const locationModule = () => {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    div.id = "cro-locations";
    h2.innerText = "Recently searched destinations";
    div.appendChild(h2);
    div.appendChild(locationBoxes());
    return div;
  };

  const locationBoxes = () => {
    const locations = getLocations();
    const length = locations.length > 5 ? 5 : locations.length;
    const ul = document.createElement("ul");
    ul.classList.add("block-wrap");

    for (let i = 0; i < length; i++) {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.innerText = locations[i].path.split("/")[2].replace(/-/g, " ");
      link.href = locations[i].url;
      li.appendChild(link);
      ul.appendChild(li);
    }
    return ul;
  };

  const getLocations = () => {
    storeSearch.getLSVal();
    return storeSearch.getSearches();
  };

  const chckPage = () => location.href === "https://www.onefinestay.com/";
  const chckAppnd = () => document.querySelectorAll("#APP_ROOT .itkUAY > .ivhDWa");
  const chckElm = () => document.querySelectorAll("#cro-locations");

  const checkAll = () => chckPage() && chckAppnd().length > 0 && chckElm().length < 1;

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

  return { getLocations, locationModule, chckAppnd, checkAll, chckElm, mobileCheck };
})();

// DOM observer to check when page makes changes =================================
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

// Wait until window loads =================================
document.addEventListener("readystatechange", (event) => {
  let previousUrl = "";

  observeDOM(window.document.body, function () {
    // if home append locations
    if (buildLoc.getLocations().length > 0 && buildLoc.checkAll() && buildLoc.mobileCheck() === false) {
      buildLoc.chckAppnd()[0].prepend(buildLoc.locationModule());
    }

    // Remove if its mobile
    if (buildLoc.chckElm().length > 0 && buildLoc.mobileCheck()) {
      buildLoc.chckElm()[0].remove();
    }

    if (location.href !== previousUrl) {
      previousUrl = location.href;
      // if search page store location
      if (storeSearch.checkUrl()) {
        storeSearch.getLSVal();
        storeSearch.checkBeforeAdd();
      }
    }
  });
});
