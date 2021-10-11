$(document).ready(() => {
    $(".selectpicker").selectpicker();
    // $(`.dropdown-toggle, .dropdown-toggle:focus`).css({
    //     outline: `none !important`,
    // });

    var x, i, j, l, ll, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
        // selElmnt = x[i].getElementsByTagName("select")[0];
        selElmnt = x[i];
        ll = selElmnt.length;
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
            /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                /*when an item is clicked, update the original select box,
        and the selected item:*/
                var y, i, k, s, h, sl, yl;
                s =
                    this.parentNode.parentNode.getElementsByTagName(
                        "select"
                    )[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y =
                            this.parentNode.getElementsByClassName(
                                "same-as-selected"
                            );
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
  except the current select box:*/
        var x,
            y,
            i,
            xl,
            yl,
            arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i);
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /*if the user clicks anywhere outside the select box,
then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
});

$(document).ready(() => {
    checkBox();
    $(`.checkbox`).data(`checked`, true);

    let select = $(`#category`);
    let check = $(`.checkbox`);

    select.on(`change`, function (e) {
        if ($(this).children("option:selected").index() > 0) {
            doUncheck();
        }

        // if ($(this).children("option:selected").index() == 0) {
        //     $(`.dropdown-toggle`).attr(`title`, `Product category`);
        // }
        doFilter();
    });
});

function checkBox() {
    let box = $(`.checkbox`);

    box.on(`click`, function (e) {
        if (isChecked()) {
            doUncheck();
        } else {
            doCheck();
        }
    });
}

function doUncheck() {
    let box = $(`.checkbox`);
    let img = box.find(`img`);
    let uncheck = "assets/uncheck.bmp";
    box.data(`checked`, false);
    img.attr(`src`, uncheck);
    $(`.result-count`).show();
}

function doCheck() {
    let box = $(`.checkbox`);
    let img = box.find(`img`);
    let check = "assets/ico-check.svg";
    let select = $(`#category`);
    box.data(`checked`, true);
    img.attr(`src`, check);

    select.find(`option`).prop(`selected`, null);
    select.find(`option`).eq(0).attr(`selected`, `selected`);
    select.trigger(`change`);
    $(`.result-count`).hide();
}

function isChecked() {
    let box = $(`.checkbox`);
    return Boolean(box.data(`checked`));
}

function resetSelect() {
    let select = $(`#category`);
    let li = $(`.dropdown-menu`);
    select.find(`option`).prop(`selected`, null);
    select.find(`option`).eq(0).attr(`selected`, `selected`);
    select.trigger(`change`);

    // li.remove();

    // li.removeClass(`active selected`);
    // li.eq(0).addClass(`active selected`);
}

function doFilter() {
    let items = $(`.p-card`);
    let select = $(`#category`);
    let selected = $(`#category`).children(`option:selected`);
    let selectedId = selected.index();

    if (isChecked()) {
        items.show();
    } else {
        items.hide();
        $(`.p-card[data-id="${selectedId}"]`).show();
        // $(`.result-count`).css(
        //     {
        //         display: `flex!important`
        //     }
        // );
        $(`.result-count`).show();
        $(`.result-count strong`).text(
            $(`.p-card[data-id="${selectedId}"]`).length
        );
    }
}
