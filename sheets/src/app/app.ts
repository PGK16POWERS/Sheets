import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('sheets');

  ngOnInit() {
    
    const sheet = document.querySelector(".sheet") as HTMLElement;

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    sheet.addEventListener("pointerdown", (e) => {
      isDragging = true;
      startY = e.clientY;
      sheet.style.transition = "none";
    });

    window.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
    
      currentY = e.clientY;
      let diff = currentY - startY;
    
      if (diff > 0) { // only drag down
        sheet.style.transform = `translateY(${diff}px)`;
      }
    });

    window.addEventListener("pointerup", () => {
      if (!isDragging) return;
      isDragging = false;
    
      let diff = currentY - startY;
    
      sheet.style.transition = "transform 0.3s ease";
    
      if (diff > 150) {
        // Close sheet
        sheet.style.transform = "translateY(300px)";
      } else {
        // Snap back
        sheet.style.transform = "translateY(0)";
      }
    });

  }
}
