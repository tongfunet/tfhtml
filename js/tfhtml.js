/*!
 * TFHtml v0.3.3 (https://tongfu.net/tfhtml/)
 * Copyright 2023-2024 The TFHtml Authors
 * Licensed under MIT (https://github.com/tongfunet/tfhtml/blob/main/LICENSE)
 */
(function(A){
    var E = function(){
        var A1 = document.location.href, A2 = ((A7 = A1.indexOf("?")) === -1) ? "" : A1.substr(A7+1), A9, AA, AC = {};
        if(A2){
            A9 = A2.split("&");
            for(var B2=0;B2<A9.length;B2++){
                AA = A9[B2].split("=");
                AC[AA[0]] = AA[1];
            }
        }
        return AC;
    };
    A.gets = E();
})(jQuery);

/**
 * tftable
 *
 * options:
 *   variables:
 *     qsHead
 *     qsHeadFields
 *     qsBodyBox
 *     qsBodyRows
 *     qsBodyRowFields
 *     qsPageBox
 *     qsPageButtons
 *
 *   functions:
 *     onMakeDataUrl: function(params)
 *     onMakeDataMethod: function()
 *     onMakeDataData: function()
 *     onProcessSuccess: function(data)
 *     onProcessError: function(xhr, status, error)
 *     onDrawData: function(data)
 *     onCreateBodyRow: function()
 *     onCreateBodyRowField: function()
 *     onDrawHead: function(params)
 *     onDrawPage: function(params)
 *     onCreatePageButton: function(params)
 *
 * public:
 *   load
 *   getDataUrlPN: function()
 *   getDataUrlSorts: function()
 *   sort
 *   page
 */
(function(A){
    var B3 = function(B6){
        return A(document.createElement(B6));
    }, B7 = function(B9, BE){
        return B9.hasAttribute("data-" + BE);
    }, BF = function(B9, BE){
        return B9.getAttribute("data-" + BE);
    }, C1 = function(C4, C8, CE){
        C4.each(function(B2, B9){
            if((D3 = B7(B9, "sortable")) && (D7 = BF(B9, "sort-field"))){
                C8[D7] = B9;
                CE[D7] = BF(B9, "sort-value");
                CE[D7] = CE[D7] == null ? "" : CE[D7];
            }
        });
    }, DD = function(E2){

    }, E8 = function(ED){
        EE(ED.a.onMakeDataUrl, ED.a.onMakeDataMethod, ED.a.onMakeDataData,
            ED.a.onProcessSuccess, ED.a.onProcessError,
            ED.a.onDrawData, ED.a.onCreateBodyRow, ED.a.onCreateBodyRowField,
            ED.a.onDrawTableHead, ED.a.onDrawTablePage, ED.a.onCreatePageButton, ED.a.onDrawTableData, ED.a.onRetrieveData,
            ED.a.afterProcessSuccess,
            ED.o, ED.s);
    }, EE = function(F3, F4, F9,
                            FD, A02,
                            A05, A06, A07,
                            A09, A0E, A10, A12, A15,
                            A1A,
                            B9, D3){
        A.ajax({
            url: A2F(F3, B9, {pn: D3.getDataUrlPN(), sorts: D3.getDataUrlSorts()}),
            method: A37(F4, B9),
            data: A3D(F9, B9),
            success: function(A20){
                A20 = A15 ? A15.call(B9, A20) : A3F(A20);
                (FD ? FD.call(B9, A20) : A45(A05, A06, A07, A09, A0E, A10, A12, B9, D3, A20));
                (A1A ? A1A.call(B9, A20) : A4B(B9, D3, A20));
            },
            error: function(A26, A28, A29){
                return A02 ? A02.call(B9, A26, A28, A29) : A51(A26, A28, A29) ;
            }
        });
    }, A2F = function(F3, B9, A34){
        return F3 ? F3.call(B9, A34) : "data/table.json?pn=" + A34.pn + "&sorts=" + A34.sorts;
    }, A37 = function(F3, B9){
        return F3 ? F3.call(B9) : "get";
    }, A3D = function(F3, B9){
        return F3 ? F3.call(B9) : {};
    }, A3F = function(A20){
        return A20;
    }, A45 = function(F3, F4, F9, FD, A02, A05, A06, B9, D3, A20){
        A55(F3, F4, F9, FD, A02, A05, A06, B9, D3.params.a, A20);
        AA7(D3, D3.params.a);
        AAD(D3, D3.params.a);
    }, A4B = function(B9, D3, A20){

    }, A51 = function(A26, A28, A29){
        console.log(A26, A28, A29);
    }, A55 = function(F3, F4, F9, FD, A02, A05, A06, B9, A57, A20){
        if(F3) F3.call(B9, A20);
        else{
            A5B(FD, B9, A57);
            A6C(A06, F4, F9, B9, A57, B9.find(A57.qsh), B9.find(A57.qsbb), A20.data);
            A9C(A02, A05, B9, A57, B9.find(A57.qspb), A20.pagination);
        }
    }, A5B = function(F3, B9, A57){
        if(F3) F3.call(B9, A57);
        else{
            for(var A61 in A57.sfvs){
                var A66 = A(A57.sfs[A61]), A6B = A57.sfvs[A61];
                A66.find("i").remove();
                if (A6B === "desc") A66.append("<i>(desc)</i>");
                else if (A6B === "asc") A66.append("<i>(asc)</i>");
            }
        }
    }, A6C = function(F3, F4, F9, B9, A57, A6F, A74, A20){
        if(F3) F3.call(B9, {data: A20});
        else{
            var B2, A61, A78, A7D, A82;
            A74.find(A57.qsbrs).not(A57.qspb).remove();
            A78 = A6F.find(A57.qshfs).length;
            for(B2=0;B2<A20.length;B2++){
                A85 = 0;
                A7D = A86(F4, B9) ;
                for(A61 in A20[B2]){
                    A82 = A87(F9, B9);
                    A82.html(A20[B2][A61]);
                    A7D.append(A82);
                    A85++;
                    if(A85 === A78) break;
                }
                A74.append(A7D);
            }
        }
    }, A86 = function(F3, B9){
        return F3 ? F3.call(B9) : B3("TR");
    }, A87 = function(F3, B9){
        return F3 ? F3.call(B9) : B3("TD");
    }, A8B = function(F3, B9, E2, A90){
        return F3 ? F3.call(B9, {pn: E2, label: A90}) : B3("A").attr("data-pn", E2).html(A90);
    }, A92 = function(A95, A9B){
        for(var A34 in A9B){
            A95 = A95.replace("{" + A34 + "}", A9B[A34]);
        }
        return A95;
    }, A9C = function(F3, F4, B9, A57, AA2, A9B){
        if(F3) F3.call(B9, {page: A9B});
        else{
            AA2.children().remove();
            AA2.append(A8B(F4, B9, 1, A57.textPageButtonHome || "home"));
            AA2.append(A8B(F4, B9, A9B.currentpage-1, A57.textPageButtonPrevious || "previous"));
            AA2.append(A8B(F4, B9, A9B.currentpage+1, A57.textPageButtonNext || "next"));
            AA2.append(A8B(F4, B9, A9B.totalpage, A57.textPageButtonLast || "last"));
            AA2.append(A57.textPageInfo ? A92(A57.textPageInfo, A9B) : A92("<span>total {total}, percent page {percentpage}, total pages {totalpage}</span>", A9B));
        }
    }, AA7 = function(D3, A57){
        D3.params.hb.find(A57.qshfs).unbind("click").click(function(){
            D3.sort(this);
        });
    }, AAD = function(D3, A57){
        D3.params.pb.find(A57.qspis).unbind("click").click(function(){
            D3.page(this);
        });
    }, AB3 = function(A57, D7){
        if(A57.sfvs[D7] != null){
            if(A57.sfvs[D7] === "asc") A57.sfvs[D7] = "desc";
            else if(A57.sfvs[D7] === "desc") A57.sfvs[D7] = "";
            else A57.sfvs[D7] = "asc";
        }
    }, AB7 = function(A57, E2){
        A57.pn = E2 ? E2 : 1;
    }, AB9 = function(ED){
        ED.s.params = ED;
        C1(ED.hb.find(ED.a.qshfs), ED.a.sfs = {}, ED.a.sfvs = {});
        DD(ED.a.pn = 1);
        E8(ED);
    }, ABC = {
        load : function(){
            this.params.a.pn = 1;
            E8(this.params);
        },
        refresh : function(){
            E8(this.params);
        },
        getDataUrlPN : function(){
            return this.params.a.pn;
        },
        getDataUrlSorts : function(){
            return JSON.stringify(this.params.a.sfvs);
        },
        sort : function(ABE){
            AB3(this.params.a, BF(ABE, "sort-field"));
            E8(this.params);
        },
        page : function(ABE){
            AB7(this.params.a, parseInt(BF(ABE, "pn")));
            E8(this.params);
        },
        init : function(AC4, ACA){
            ACA = ACA||{};
            ACA.qsh = ACA.qsHead ? ACA.qsHead : "thead tr";
            ACA.qshfs = ACA.qsHeadFields ? ACA.qsHeadFields : "th";
            ACA.qsbb = ACA.qsBodyBox ? ACA.qsBodyBox : "tbody";
            ACA.qsbrs = ACA.qsBodyRows ? ACA.qsBodyRows : "tr";
            ACA.qsbrfs = ACA.qsBodyRowFields ? ACA.qsBodyRowFields : "td";
            ACA.qspb = ACA.qsPageBox ? ACA.qsPageBox : ".pagination";
            ACA.qspis = ACA.qsPageItems ? ACA.qsPageItems : "a";
            AB9({s: this, o: A(AC4), hb: A(AC4).find(ACA.qsh), bb: A(AC4).find(ACA.qsbb), pb: A(AC4).find(ACA.qspb), a: ACA});
        }
    };
    ABC.init.prototype = ABC;
    A.fn.tftable = function(ACA){
        return new ABC.init(this, ACA);
    };
})(jQuery);

/**
 * tfform
 *
 * options:
 *   variables:
 *     defaultData: {}
 *     dataType
 *     validateRules: []
 *
 *   functions:
 *     onPostValidateError: function(rule)
 *     onMakeFormAction: function()
 *     onMakeFormMethod: function()
 *     onMakeFormData: function()
 *     onProcessSuccess: function(data)
 *     onProcessError: function(xhr, status, error)
 *
 * public:
 *
 */
(function(A){
    var ACC = function(ED){
        AD0(ED.f, ED.a.defaultData);
    }, AD0 = function(A61, A20){
        for(var AD1 in A20) AD2(A61, A61.find('[name="'+AD1+'"]'), A20[AD1]);
    }, AD2 = function(A61, ABE, A20){
        if(ABE.length) for(var B2=0;B2<ABE.length;B2++) AD8(A61, B2, ABE[B2], A20);
    }, AD8 = function(A61, B2, ABE, A20){
        if(ABE.type && (ABE.type === "radio" || ABE.type === "checkbox")){
            ABE.checked = false;
            for(var A85=0;A85<A20.length;A85++){ if(ABE.value === A20[A85]) ABE.checked = true; }
        }
        else if(ABE.tagName === "SELECT") for(var A85=0;A85<ABE.options.length;A85++) ADB(A61, A85, ABE.options[A85], A20 instanceof Array ? A20 : [A20]);
        else ABE.value = (A20 instanceof Array) ? A20[B2] : A20;
    }, ADB = function(A61, A85, ABE, A20){
        ABE.selected = false;
        for(var ADD=0;ADD<A20.length;ADD++){ if(ABE.value == A20[ADD]) ABE.selected = true; }
    }, AE3 = function(ED){
        return (ED.a.onSubmitForm) ? ED.a.onSubmitForm.call(ED.o) : AE4(ED.a.onMakeFormAction, ED.a.onMakeFormMethod, ED.a.onMakeFormData,
            ED.a.onPostValidateError,
            ED.a.onProcessSuccess, ED.a.onProcessError,
            ED.f, ED.a.validateRules, ED.a.dataType);
    }, AE4 = function(F3, F4, F9, FD, A02, A05, A61, AE6, AEB){
        B09(F9, A61);
        if(!AF2(FD, A61, AE6)) return false;
        var AEE = {
            url: B03(F3, A61),
            method: B06(F4, A61),
            data: null,
            contentType: false,
            processData: false,
            success: function(A20){
                return A02 ? A02.call(A61, A20) : A45(A20) ;
            },
            error: function(AF0, D3, ABE){
                return A05 ? A05.call(A61, AF0, D3, ABE) : A51(AF0, D3, ABE) ;
            }
        };
        if(AEB === "json"){
            AEE.data = JSON.stringify(A61.fda);
            AEE.contentType = "application/json";
        }
        else{
            AEE.data = A61.fd;
        }
        A.ajax(AEE);
        return true;
    }, AF2 = function(F3, A61, AE6){
        A61.fda = {};
        A61.fd.forEach(function(AF8, ADD){
            if(A61.fda[ADD] == null) A61.fda[ADD] = AF8;
            else{
                if(!(A61.fda[ADD] instanceof Array)) A61.fda[ADD] = [A61.fda[ADD]];
                A61.fda[ADD].push(AF8);
            }
        });
        for(var B2=0;B2<AE6.length;B2++) if(!AFB(F3, A61, AE6[B2])) return false;
        return true;
    }, AFB = function(F3, A61, B00){
        if(typeof A61.fda[B00.name] !== "undefined"){
            switch(B00.type){
                case "empty":
                    if((typeof A61.fda[B00.name] === "string" && !A61.fda[B00.name])
                        || (typeof A61.fda[B00.name] === "object" && !A61.fda[B00.name].name)){
                        B02(F3, A61, B00);
                        return false;
                    }
                    break;
            }
        }
        else{
            switch(B00.type){
                case "unchecked":
                    B02(F3, A61, B00);
                    return false;
                case "unselected":
                    B02(F3, A61, B00);
                    return false;
            }
        }
        return true;
    }, B02 = function(F3, A61, B00){
        if(F3) F3.call(A61, B00);
        else{
            alert(B00.errmsg);
            A61.find('[name="'+B00.name+'"]').focus();
        }
    }, B03 = function(F3, A61){
        return F3 ? F3.call(A61) : A61.attr("action");
    }, B06 = function(F3, A61){
        return F3 ? F3.call(A61) : A61.attr("method");
    }, B09 = function(F3, A61){
        return F3 ? (A61.fd = F3.call(A61)) : (A61.fd = new FormData(A61[0]));
    }, A45 = function(A20){
        console.log(A20);
    }, A51 = function(AF0, D3, ABE){
        console.log(AF0, D3, ABE);
    }, AB9 = function(ED){
        if(typeof ED.f == "undefined"){
            throw ("element 'form' is not found");
        }
        if(ED.f.length > 1){
            throw ("elements 'form' are found");
        }
        ED.f.fd = ED.f.fda = null;
        ACC(ED);
        ED.f.unbind().bind("submit", function(){
            AE3(ED);
            return false;
        });
    }, ABC = {
        init : function(AC4, ACA){
            ACA = ACA||{};
            ACA.validateRules = ACA.validateRules||[];
            ACA.defaultData = ACA.defaultData||{};
            ACA.dataType = ACA.dataType||"form";
            AB9({o: A(AC4), f: A(AC4).find("form"), a: ACA});
        }
    };
    ABC.init.prototype = ABC;
    A.fn.tfform = function(ACA){
        return new ABC.init(this, ACA);
    };
})(jQuery);

/**
 * tfdialog
 *
 * options:
 *   variables:
 *
 *   functions:
 *     onResizeWindow: function()
 *     onShow: function()
 *     onHide: function()
 *
 * public:
 *   show
 *   hide
 *
 */
(function(A){
    var B3 = function(B0C){
        return A(document.createElement(B0C));
    }, B0F = function(A34){
        B12(A34, A34.a.onShow)
    }, B12 = function(A34, F3){
        A34.b.css({overflow: "hidden"}).append((A34.m = B3("DIV")).css({display: "block", position: "absolute", left: 0, top: 0, background: "black", opacity: 0.16, zIndex: 1568}));
        A34.b.append((A34.f = B3("DIV")).css({display: "block", position: "absolute", zIndex: 1569}));
        A34.p = A34.o.parent();
        A34.a.osd = A34.o.css("display");
        A34.a.osv = A34.o.css("visibility");
        A34.f.append(A34.o.css({display: "block"}));
        B13.call(window, A34);
        F3 ? F3.call(A34.o) : null;
    }, B13 = function(A34){
        B16(this, A34.a.onResizeWindow, A34.o, A34.m, A34.f);
    }, B16 = function(B18, F3, B9, B1D, A61){
        B1D.css({width: B18.innerWidth, height: B18.innerHeight});
        A61.css({left: (B18.innerWidth-B9.width())/2, top: (B18.innerHeight-B9.height())/2});
        F3 ? F3.call(B9) : null;
    }, B23 = function(ED){
        B24(ED.a.onHide, ED.o.css({display: ED.a.osd, visibility: ED.a.osv}), ED.p, ED.m, ED.f);
    }, B24 = function(F3, B9, A34, B1D, A61){
        B9.css({display: B9.osd, visibility: B9.osv});
        A34.append(B9);
        B1D.remove();
        A61.remove();
        F3 ? F3.call(B9) : null;
    }, B29 = function(ED){
        B2D(this, ED.s);
    }, B2D = function(B2E, D3){
        switch(B2E.getAttribute("data-dialog-button")){
            case "close":
                D3.hide();
                break;
        }
    }, AB9 = function(ED){
        ED.s.params = ED;
        ED.w.bind("resize", function(){
            B13.call(this, ED);
        });
        ED.o.find("[data-dialog-button]").unbind().click(function(){
            B29.call(this, ED);
        });
        ED.s.show();
    }, ABC = {
        show : function(){
            B0F(this.params);
        },
        hide : function(){
            B23(this.params);
        },
        init : function(AC4, ACA){
            AB9({s: this, o: A(AC4), w: A(window), b: A(document.body), a: ACA||{}});
        }
    };
    ABC.init.prototype = ABC;
    A.fn.tfdialog = function(ACA){
        return new ABC.init(this, ACA);
    };
})(jQuery);

/**
 * tftips
 *
 * options:
 *   variables:
 *     text: ""
 *     class: ""
 *     timeout: 3000
 *
 *   functions:
 *
 * public:
 *
 */
(function(A){
    var B3 = function(B0C){
        return A(document.createElement(B0C));
    }, B32 = function(ED){
        if(window.tftipsT) B38(ED);
        window.tftipsT = window.setTimeout(function(){
            B3B(ED);
        }, ED.a.timeout||3000);
        ED.o.append((ED.t = B3("DIV")).addClass((ED.a.class) ? "tips " + ED.a.class : "tips").text(ED.a.text));
        ED.t.css({top: (ED.o.height()-ED.t.height())/2, left: (ED.o.width()-ED.t.width())/2, zIndex: 1588});
    }, B38 = function(ED){
        clearTimeout(window.tftipsT);
        window.tftipsT = null;
        ED.o.find(".tips").remove();
    }, B3B = function(ED){
        ED.t.remove();
    }, AB9 = function(ED){
        B32(ED);
    }, ABC = {
        init : function(AC4, ACA){
            AB9({s: this, o: A(AC4), a: ACA||{}});
        }
    };
    ABC.init.prototype = ABC;
    A.fn.tftips = function(ACA){
        return new ABC.init(this, ACA);
    };
})(jQuery);
