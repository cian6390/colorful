import { fabric } from "fabric";
import CakeImage from "../../assets/cake.png";
import { reactive, ref } from 'vue'

export function useCardEditor(el, width, height) {

    const canvas = new fabric.Canvas(el, {
        width: width,
        height: height
    })

    const selectedObject = ref(null)

    function addText(str, options = {}) {
        var text = new fabric.Textbox(str, options);
        canvas.add(text);
        return text
    }

    function calcNewSizeScale(img, maxLength = 150) {
        const oWidth = img.width
        const oHeight = img.height
        if (oWidth <= maxLength && oHeight <= maxLength) {
            return 1
        } else {
            const base = oWidth > oHeight ? 'width' : 'height'
            if (base === 'width') {
                return 1 / (oWidth / maxLength)
            } else {
                return 1 / (oHeight / maxLength)
            }
        }
    }

    function addImage(urlOrImgElement, attrs = {}) {
        if (urlOrImgElement instanceof HTMLImageElement) {
            const img = new fabric.Image(urlOrImgElement);
            img.left = attrs.left || 0
            img.top = attrs.top || 0
            img.scale(calcNewSizeScale(img))
            canvas.add(img);
        } else {
            fabric.Image.fromURL(urlOrImgElement, function (img) {
                img.scale(0.2)
                img.left = attrs.left || 0
                img.top = attrs.top || 0
                canvas.add(img);
            });
        }
    }

    function objectLayerUp(targetObject, intersecting = true) {
        canvas.bringForward(targetObject, intersecting);
        return canvas.getObjects().indexOf(targetObject);
    }

    function objectLayerDown(targetObject, intersecting = true) {
        canvas.sendBackwards(targetObject, intersecting);
        return canvas.getObjects().indexOf(targetObject);
    }

    function download() {
        const dataURL = canvas.toDataURL({
            width: canvas.width,
            height: canvas.height,
            left: 0,
            top: 0,
            format: 'png',
            multiplier: 4
        });
        const link = document.createElement('a');
        link.download = 'image.png';
        link.href = dataURL;
        link.click();
        link.remove()
    }

    window.addEventListener('keydown', e => {
        const key = e.key
        const targetObject = canvas.getActiveObject()
        if (key === 'Backspace' && targetObject && !targetObject.isEditing) {
            canvas.remove(targetObject);
        }
    })


    function setupExample() {
        addImage(CakeImage, { left: 120, top: 210 });
        addText("哈囉 ~ 妳好嗎 😙", {
            top: 130,
            left: 100,
            fontFamily: "Nunito",
            fontSize: 28,
            fill: "#333",
            width: 250,
        });
    }

    return {
        canvas,
        download,
        addImage,
        addText,
        objectLayerUp,
        objectLayerDown,
        setupExample,
        selectedObject
    }
}