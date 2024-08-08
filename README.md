<h1 align="center">TFHtml v0.3.0</h1>

## TFHtml

TFHtml is a front-end framework used for rapid development of web front-end programs. Our pursuit is simplicity, speed, and power.

## Learning TFPHP

The TFHtml framework is still undergoing continuous improvement. Interested friends, please continue to follow us.

The TFHtml framework is implemented based on jQuery. We have implemented several plugins for the most commonly used scenarios in web development, including tftable, tfform. Below are some usage examples, including HTML and JS code.

### Plugin tftable

html
```html
<div id="table" class="table">
    <table>
        <thead>
        <tr>
            <th data-sortable data-sort-field="id" data-sort-value="desc">ID</th>
            <th data-sortable data-sort-field="name">Name</th>
            <th data-sortable data-sort-field="state">state</th>
            <th data-sortable data-sort-field="createTime">create time</th>
            <th data-sortable data-sort-field="updateTime">update time</th>
            <th>operators</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        </tbody>
    </table>
    <div class="pagination"></div>
</div>
```

javascript
```javascript
my = $("#table").tftable({
    onMakeDataUrl: function(){
        return "data/table.json?pn=" + this.getDataUrlPN() + "&sorts=" + this.getDataUrlSorts();
    }
});
```

### Plugin tfform

html
```html
<div id="form">
    <form action="data/form.do" method="post">
        <table>
            <tr><td>text</td><td><input type="text" name="text"></td></tr>
            <tr><td>password</td><td><input type="password" name="password"></td></tr>
            <tr><td>file</td><td><input type="file" name="file"></td></tr>
            <tr><td>radio</td><td><label><input type="radio" name="radio" value="1"> radio1</label>
                <label><input type="radio" name="radio" value="2"> radio2</label></td></tr>
            <tr><td>checkbox</td><td><label><input type="checkbox" name="checkbox" value="1"> checkbox1</label>
                <label><input type="checkbox" name="checkbox" value="2"> checkbox2</label>
                <label><input type="checkbox" name="checkbox" value="3"> checkbox3</label></td></tr>
            <tr><td>textarea</td><td><textarea name="textarea"></textarea></td></tr>
            <tr><td> </td><td><button>Submit</button></td></tr>
        </table>
    </form>
</div>
```

javascript
```javascript
my = $("#form").tfform({
    dataType: "json",
    validateRules: [
        {name: "text", type: "empty", errmsg: "text is required"},
        {name: "password", type: "empty", errmsg: "password is required"},
        {name: "file", type: "empty", errmsg: "file is required"},
        {name: "radio", type: "unchecked", errmsg: "radio is required"},
        {name: "checkbox", type: "unchecked", errmsg: "checkbox is required"},
        {name: "textarea", type: "empty", errmsg: "textarea is required"}
    ],
    defaultData: {
        "text": "text",
        "password": "password",
        "radio": ["1"],
        "checkbox": ["1", "3"],
        "textarea": "textarea",
    }
});
```

### Plugin tfdialog

html
```html
<div id="dialog">
    <form action="data/form.do" method="post">
        <div class="title-bar">
            <div class="title">dialog</div>
            <div class="buttons">
                <i data-dialog-button="close">X</i>
            </div>
        </div>
        <div class="content-box">
            <h3>title</h3>
            <p>this is a dialog demo.</p>
        </div>
    </form>
</div>
```

javascript
```javascript
var my = $("#dialog").tfdialog({
    onResizeWindow: function(){
        console.log("window is resizing...");
    },
    onShow : function(){
        console.log("showing...");
    },
    onHide : function(){
        console.log("hiding...");
    }
});
```

### Plugin tftips

html
```html
<div id="tips1" style="position: relative; margin: 0 auto; width: 640px;">
    <h3>title</h3>
    <p>this is a dialog demo.</p>
</div>
```

javascript
```javascript
$("#tips1").tftips({
    text: "hello tfhtml!"
});
```

## License

The TFHtml framework is open-sourced software licensed under the <a href="https://opensource.org/licenses/MIT">MIT license</a>.