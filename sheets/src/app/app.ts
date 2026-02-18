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
    
    const handle = document.querySelector(".handle") as HTMLElement;
    const sheet = document.querySelector(".sheet") as HTMLElement;

    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let startTime = 0;
    let currentTime = 0;

    handle.addEventListener('pointerdown', (e) => {
      isDragging = true;
      startTime = Date.now();
      startY = e.clientY;
      sheet.style.transition = 'none';
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;

      currentY = e.clientY;
      let diff = currentY - startY;

      if (diff > 0) {
        sheet.style.transform = `translateY(${diff}px)`
      }
    });

    window.addEventListener('pointerup', () => {
      if (!isDragging) return;
      isDragging = false;

      sheet.style.transition = 'transform 0.3s ease'

      let currentTime = Date.now();
      let timeDiff = currentTime - startTime;
      let diff = currentY - startY;
      let velo = diff / timeDiff

      if (diff > 150 || velo > 1) {
        sheet.style.transform = 'translateY(300px)'
      } else {
        sheet.style.transform = 'translateY(0px)'
      }
    })

  }
}
