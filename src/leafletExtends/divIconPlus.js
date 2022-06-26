import L from "leaflet"

export var DivIconPlus = L.Icon.extend({
    options: {
        size: 20,
        className: "leaflet-div-icon-plus",
        bgPos: null,
        offSet: null,
        iconClass: null,
        background: '#fff',
        color: 'red'

    },
    createIcon: function (oldIcon) {
        const options = this.options;
        const innerEl = this.createInnerHTML();
        //创建div的标签
        const div = document.createElement('div');
        //核心创建Html元素
        div.appendChild(innerEl)
        //设置icon的偏移量
        if (options.offSet) {
            div.style.left = ((-options.size / 2) + options.offSet[0]) + 'px ';
            div.style.top = ((-options.size / 2) + options.offSet[1]) + 'px ';
        } else {
            div.style.left = (-options.size / 2) + 'px ';
            div.style.top = (-options.size / 2) + 'px ';
        }

        //divicon原生功能
        if (options.bgPos) {
            var bgPos = L.point(options.bgPos);
            div.style.backgroundPosition = (-bgPos.x) + 'px ' + (-bgPos.y) + 'px';
        }
        this._setIconStyles(div, 'icon');

        return div;
    },
    createInnerHTML: function () {
        let el = null;
        if (this.options.iconClass) {
            //创建i标签
            el = document.createElement('i')
            //添加elementUI的ICON的class
            el.className = this.options.iconClass;
            //设置Icon的style
            el.style.borderRadius = "50%";
            el.style.background = this.options.background;
            el.style.color = this.options.color;
            el.style.fontSize = this.options.size + 'px';
            //将i标签加入岛div中
        } else {

            el = document.createElement('img');
            el.src = this.options.iconUrl;
            el.style.height = this.options.size + 'px';
            el.style.width = this.options.size + 'px';
        }
        return el;
    }
});

L.divIconPlus = function (options) {
    return new DivIconPlus(options);
}