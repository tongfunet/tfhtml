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
 *     onEventSortButtons
 *     onEventPageButtons
 *     onCreateBodyRow
 *     onCreateBodyRowField
 *     onCreatePageButton
 *     onDrawData
 *     onMakeDataUrl
 *     onMakeDataMethod
 *     onMakeDataData
 *     onDrawHead
 *     onDrawPage
 *
 * public:
 *   load
 *   getDataUrlPN
 *   getDataUrlSorts
 *   sort
 *   page
 */
(function($){
    var createElement = function(tag){
        return $(document.createElement(tag));
    }, hasDataAttr = function(o, key){
        return o.hasAttribute("data-" + key);
    }, getDataAttr = function(o, key){
        return o.getAttribute("data-" + key);
    }, events = function(ex, objs, args, opts){
        initArgs(ex, objs, args, opts);
        initSortFields(objs.h.find(opts.qshfs), args.sfs, args.sfvs);
        load(ex, objs, args, opts);
    }, initArgs = function(ex, objs, args, opts){
        ex.objs = objs;
        ex.args = args;
        ex.opts = opts;
    }, initSortFields = function(hfs, sfs, sfvs){
        hfs.each(function(i, o){
            if((s = hasDataAttr(o, "sortable")) && (sf = getDataAttr(o, "sort-field"))){
                sfs[sf] = o;
                sfvs[sf] = getDataAttr(o, "sort-value");
                sfvs[sf] = sfvs[sf] == null ? "" : sfvs[sf];
            }
        });
    }, load = function(ex, objs, args, opts){
        $.ajax({
            url: makeDataUrl(ex, opts),
            method: makeDataMethod(ex, opts),
            data: makeDataData(ex, opts),
            success: function(data){
                return opts.onProcessSuccess ? opts.onProcessSuccess(ex, data, objs, args, opts) : processSuccess(ex, data, objs, args, opts) ;
            },
            error: function(xhr, status, error){
                return opts.onProcessError ? opts.onProcessError(xhr, status, error) : processError(xhr, status, error) ;
            }
        });
    }, makeDataUrl = function(ex, opts){
        return opts.onMakeDataUrl ? opts.onMakeDataUrl.call(ex) : "data/table.json?pn=" + ex.getDataUrlPN() + "&sorts=" + ex.getDataUrlSorts();
    }, makeDataMethod = function(ex, opts){
        return opts.onMakeDataMethod ? opts.onMakeDataMethod() : "get";
    }, makeDataData = function(ex, opts){
        return opts.onMakeDataData ? opts.onMakeDataData() : {};
    }, processSuccess = function(ex, data, objs, args, opts){
        drawData(data, objs, args, opts);
        eventSort(ex, objs, opts);
        eventPage(ex, objs, opts);
    }, processError = function(xhr, status, error){
        console.log(xhr, status, error);
    }, drawData = function(data, objs, args, opts){
        if(opts.onDrawData) opts.onDrawData(data, objs, args, opts);
        else{
            drawTableData(objs.bb, data.data, opts);
            drawHead(args.sfs, args.sfvs, opts);
            drawPage(objs.pb, data.pagination, opts);
        }
    }, drawTableData = function(bb, data, opts){
        var i, f, tr, td;
        bb.find(opts.qsbrs).not(opts.qspb).remove();
        for(i=0;i<data.length;i++){
            j = 0;
            tr = createBodyRow(opts);
            for(f in data[i]){
                td = createBodyRowField(opts);
                td.html(data[i][f]);
                tr.append(td);
                j++;
            }
            bb.append(tr);
        }
    }, drawHead = function(fs, fvs, opts){
        if(opts.onDrawHead) opts.onDrawHead(fs, fvs);
        else{
            for(var f in fvs){
                var $f = $(fs[f]), fv = fvs[f];
                $f.find("i").remove();
                if (fv === "desc") $f.append("<i>(desc)</i>");
                else if (fv === "asc") $f.append("<i>(asc)</i>");
            }
        }
    }, createBodyRow = function(opts){
        return opts.onCreateBodyRow ? opts.onCreateBodyRow() : createElement("TR");
    }, createBodyRowField = function(opts){
        return opts.onCreateBodyRowField ? opts.onCreateBodyRowField() : createElement("TD");
    }, createPageButton = function(pn, label, opts){
        return opts.onCreatePageButton ? opts.onCreatePageButton(pn, label) : createElement("A").attr("data-pn", pn).html(label);
    }, drawPage = function(pb, pg, opts){
        if(opts.onDrawPage) opts.onDrawPage(pb, pg, opts);
        else{
            pb.children().remove();
            pb.append(createPageButton(1, "home", opts));
            pb.append(createPageButton(pg.currentpage-1, "previous", opts));
            pb.append(createPageButton(pg.currentpage+1, "next", opts));
            pb.append(createPageButton(pg.pages, "last", opts));
            pb.append("<span>total " + pg.total + ", percent page " + pg.pagesize + ", total pages " + pg.pages + "</span>");
        }
    }, eventSort = function(ex, objs, opts){
        return opts.onEventSortButtons ? opts.onEventSortButtons() : objs.h.find(opts.qshfs).unbind("click").click(function(){
            ex.sort(this);
        });
    }, eventPage = function(ex, objs, opts){
        return opts.onEventPageButtons ? opts.onEventPageButtons() : objs.pb.find(opts.qspis).unbind("click").click(function(){
            ex.page(this);
        });
    }, sort = function(fvs, sf){
        if(fvs[sf] != null){
            if(fvs[sf] === "asc") fvs[sf] = "desc";
            else if(fvs[sf] === "desc") fvs[sf] = "";
            else fvs[sf] = "asc";
        }
    }, _tfjqp = {
        load : function(){
            load(this, this.objs, this.args, this.opts);
        },
        getDataUrlPN : function(){
            return this.args.pn;
        },
        getDataUrlSorts : function(){
            return JSON.stringify(this.args.sfvs);
        },
        sort : function(e){
            sort(this.args.sfvs, getDataAttr(e, "sort-field"));
            load(this, this.objs, this.args, this.opts);
        },
        page : function(e){
            this.args.pn = parseInt(getDataAttr(e, "pn"));
            load(this, this.objs, this.args, this.opts);
        },
        init : function(obj, opts){
            opts.qsh = opts.qsHead ? opts.qsHead : "thead tr";
            opts.qshfs = opts.qsHeadFields ? opts.qsHeadFields : "th";
            opts.qsbb = opts.qsBodyBox ? opts.qsBodyBox : "tbody";
            opts.qsbrs = opts.qsBodyRows ? opts.qsBodyRows : "tr";
            opts.qsbrfs = opts.qsBodyRowFields ? opts.qsBodyRowFields : "td";
            opts.qspb = opts.qsPageBox ? opts.qsPageBox : ".pagination";
            opts.qspis = opts.qsPageItems ? opts.qsPageItems : "a";
            var $obj = $(obj), objs = {h: $obj.find(opts.qsh), bb: $obj.find(opts.qsbb), pb: $obj.find(opts.qspb)}, args = {sfs: {}, sfvs: {}, pn: 1};
            events(this, objs, args, opts);
        }
    };
    _tfjqp.init.prototype = _tfjqp;
    $.fn.tftable = function(opts){
        my = new _tfjqp.init(this, opts);
        return my;
    };
})(jQuery);

/**
 * tfform
 *
 * options:
 *   variables:
 *     dataType
 *     validateRules
 *     defaultData
 *
 *   functions:
 *     onSubmitForm
 *     onProcessSuccess
 *     onProcessError
 *     onMakeFormAction
 *     onMakeFormMethod
 *     onMakeFormData
 *     onPostValidateError
 *
 * public:
 *
 */
(function($){
    var events = function(ex, objs, args, opts){
        setFormData(ex, objs.fm, opts);
        objs.fm.unbind().bind("submit", function(){
            submit(ex, objs.fm, opts);
            return false;
        });
    }, setFormData = function(ex, fm, opts){
        setFormDefaultData(ex, fm, opts.defaultData);
    }, setFormDefaultData = function(ex, fm, dd){
        for(var f in dd) setFormDefaultDataItems(ex, fm, fm.find('[name="'+f+'"]'), dd[f]);
    }, setFormDefaultDataItems = function(ex, fm, elems, data){
        if(elems.length) for(var i=0;i<elems.length;i++) setFormDefaultDataItem(ex, fm, i, elems[i], data);
    }, setFormDefaultDataItem = function(ex, fm, index, elem, data){
        if(elem.type && (elem.type === "radio" || elem.type === "checkbox")) for(var j=0;j<data.length;j++){ if(elem.value === data[j]) elem.checked = true }
        else elem.value = (data instanceof Array) ? data[index] : data;
    }, submit = function(ex, fm, opts){
        return opts.onSubmitForm ? opts.onSubmitForm(ex, fm, opts) : submitForm(ex, fm, opts) ;
    }, submitForm = function(ex, fm, opts){
        makeFormData(fm, opts);
        if(!validateFormData(ex, fm, opts.validateRules, opts)) return false;
        var ajaxOpts = {
            url: makeFormAction(fm, opts),
            method: makeFormMethod(fm, opts),
            data: null,
            contentType: false,
            processData: false,
            success: function(data){
                return opts.onProcessSuccess ? opts.onProcessSuccess(data) : processSuccess(data) ;
            },
            error: function(xhr, status, error){
                return opts.onProcessError ? opts.onProcessError(xhr, status, error) : processError(xhr, status, error) ;
            }
        };
        if(opts.dataType === "json"){
            ajaxOpts.data = JSON.stringify(fm.fda);
            ajaxOpts.contentType = "application/json";
        }
        else{
            ajaxOpts.data = fm.fd;
        }
        $.ajax(ajaxOpts);
        return true;
    }, validateFormData = function(ex, fm, fvrs, opts){
        fm.fda = {};
        fm.fd.forEach(function(v, k){
            if(fm.fda[k] == null) fm.fda[k] = v;
            else{
                if(!(fm.fda[k] instanceof Array)) fm.fda[k] = [fm.fda[k]];
                fm.fda[k].push(v);
            }
        });
        for(var i=0;i<fvrs.length;i++) if(!validateFormDataItem(ex, fm, fvrs[i], opts)) return false;
        return true;
    }, validateFormDataItem = function(ex, fm, rule, opts){
        if(typeof fm.fda[rule.name] !== "undefined"){
            switch(rule.type){
                case "empty":
                    if((typeof fm.fda[rule.name] === "string" && !fm.fda[rule.name])
                        || (typeof fm.fda[rule.name] === "object" && !fm.fda[rule.name].name)){
                        postValidateError(ex, fm, rule, opts);
                        return false;
                    }
                    break;
            }
        }
        else{
            switch(rule.type){
                case "unchecked":
                    postValidateError(ex, fm, rule, opts);
                    return false;
            }
        }
        return true;
    }, postValidateError = function(ex, fm, rule, opts){
        if(opts.onPostValidateError) opts.onPostValidateError(fm, rule, opts);
        else{
            alert(rule.errmsg);
            fm.find('[name="'+rule.name+'"]').focus();
        }
    }, makeFormAction = function(fm, opts){
        return opts.onMakeFormAction ? opts.onMakeFormAction(fm, opts) : fm.attr("action");
    }, makeFormMethod = function(fm, opts){
        return opts.onMakeFormMethod ? opts.onMakeFormMethod(fm, opts) : fm.attr("method");
    }, makeFormData = function(fm, opts){
        return opts.onMakeFormData ? opts.onMakeFormData(fm, opts) : (fm.fd = new FormData(fm[0]));
    }, processSuccess = function(data){
        console.log(data);
    }, processError = function(xhr, status, error){
        console.log(xhr, status, error);
    }, _tfjqp = {
        init : function(obj, opts){
            if(!opts.validateRules) opts.validateRules = [];
            if(!opts.defaultData) opts.defaultData = {};
            var $obj = $(obj), objs = {fm: $obj.find("form")}, args = {};
            if(typeof objs.fm == "undefined"){
                throw ("element 'form' is not found");
            }
            if(objs.fm.length > 1){
                throw ("elements 'form' are found");
            }
            objs.fm.fd = objs.fm.fda = null;
            events(this, objs, args, opts);
        }
    };
    _tfjqp.init.prototype = _tfjqp;
    $.fn.tfform = function(opts){
        my = new _tfjqp.init(this, opts);
        return my;
    };
})(jQuery);

(function($){
    var events = function(ex, objs, args, opts){

    }, _tfjqp = {
        init : function(obj, opts){
            var objs = {}, args = {};
            events(this, objs, args, opts);
        }
    };
    _tfjqp.init.prototype = _tfjqp;
    $.fn.tfdialog = function(opts){
        my = new _tfjqp.init(this, opts);
        return my;
    };
})(jQuery);
