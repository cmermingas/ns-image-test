import {Component, ViewChild, OnInit} from "@angular/core";
import {screen} from "platform";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
    @ViewChild('listPicker') listPicker;
    @ViewChild('imageWidget') imageWidget;
    _listPickerItems = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
    currentFrame = 0;
    useScale = false;
    scale;


    ngOnInit() {
        let imageWidgetStyle = this.imageWidget.nativeElement.style;
        imageWidgetStyle.width = 200;
        imageWidgetStyle.height = 200;
        imageWidgetStyle.backgroundImage = "url('~/number_grid.png')";
        this.setScale();
        this.updateImage();
    }

    updateImage() {
        // The numbers horribly hardcoded below are:
        // 800 = Image width = Image height
        // 4 = Number of columns in the image
        let imageWidgetStyle = this.imageWidget.nativeElement.style;
        imageWidgetStyle.backgroundSize = '' + 800 * this.scale +  ' ' + 800 * this.scale;
        let offsetX = ((this.currentFrame % 4) * 800 / 4) * this.scale;
        let offsetY = (Math.floor(this.currentFrame / 4) * 800 / 4) * this.scale;
        imageWidgetStyle.backgroundPosition = '-' + offsetX + ' -' + offsetY;
    }

    setCurrentFrame(n) {
        this.currentFrame = n;
        this.updateImage();
    }

    setScale() {
        this.scale = this.useScale ? screen.mainScreen.scale : 1;
        this.updateImage();
    }

    listPickerChange(picker) {
        this.setCurrentFrame(picker.selectedIndex);
        this.updateImage();
    }

    toggleUseScale() {
        this.useScale = !this.useScale;
        this.setScale()
    }
}
