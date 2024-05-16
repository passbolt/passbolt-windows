/**
 * Polyfill for WebView2 Drag and Drop Bug
 *
 * This polyfill patches a known bug in WebView2 where drag and drop functionalities are
 * not working as expected. This script provides a mock implementation to temporarily
 * overcome the issue.
 *
 * More information:
 * - https://github.com/MicrosoftEdge/WebView2Feedback/issues/2805
 * - https://github.com/dotnet/maui/issues/2205
 *
 * This code is based on the work of Iain Fraser. Its license applies and is limited to
 * this file only. The copyright of passbolt applies to the changes made on the original
 * copy.
 * @url           https://gist.github.com/iain-fraser/01d35885477f4e29a5a638364040d4f2
 *
 * Copyright (c) 2023 Iain Fraser
 * Copyright (c) 2024 Passbolt SA (https://www.passbolt.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @since         1.1.0
 */

class DragAndDropPolyfill {
  isDragging = false;
  hasMoved = false;
  draggedElement = null;
  startPosition = {x: 0, y: 0};
  currentOverElement = null;
  ghostElement = null;
  dragstart = null;

  constructor() {
    document.addEventListener('mousedown', event => this.handleMouseDown(event));
    document.addEventListener('mousemove', event => this.handleMouseMove(event));
    document.addEventListener('mouseup', event => this.handleMouseUp(event));
  }

  /**
   * Handle the mousedown event
   * @param {MouseEvent} event - The mousedown event
   */
  handleMouseDown(event) {
    // Exit early if not left click or if draggable element not found
    if (event.button !== 0 || !this.findDraggableAncestor(event.target)) { return; }

    const draggableElement = this.findDraggableAncestor(event.target);

    /*
     * Override the existing functionality and update state for dragging
     * draggableElement.setAttribute('draggable', 'false');
     */
    this.isDragging = true;
    this.draggedElement = draggableElement;
    this.startPosition = {x: event.clientX, y: event.clientY};
  }

  /**
   * Handle the mousemove event
   * @param {MouseEvent} event - The mousedown event
   */
  handleMouseMove(event) {
    if (!this.isDragging) { return; }

    if (!this.hasMoved) {
      this.hasMoved = true;
      // Fire dragstart event
      this.dragstart = this.createMockDragEvent('dragstart', this.getDragMoveEvent(event));
      this.draggedElement.dispatchEvent(this.createMockDragEvent('dragstart', this.getDragMoveEvent(event)));
    }
    // Retrieve image set during the setImage event from the styleguide
    const dragImage = document.getElementById('drag-image');

    if (!this.ghostElement && dragImage) {
      // Assign ghost element to drag image from styleguide
      this.ghostElement = dragImage;
    }

    if (this.ghostElement) {
      const x = event.clientX - this.startPosition.x;
      const y = event.clientY - this.startPosition.y;

      //Update drag image position
      this.ghostElement.style.transform = `translate(${x}px, ${y}px)`;
      // Check for drag over target
      this.ghostElement.style.display = 'none';
      const elementBelow = document.elementFromPoint(event.clientX, event.clientY);
      this.ghostElement.style.display = '';

      // Check if the current mouse position is outside the current over element
      if (this.currentOverElement && !this.isPointInsideElement(this.currentOverElement, event.clientX, event.clientY)) {
        // Fire dragleave event
        this.currentOverElement.dispatchEvent(this.createMockDragEvent('dragleave', this.getDragMoveEvent(event)));
        //this.currentOverElement = null;
      }

      if (elementBelow && elementBelow !== this.currentOverElement) {
        if (this.currentOverElement) { this.currentOverElement.dispatchEvent(this.createMockDragEvent('dragleave', this.getDragMoveEvent(event))); }
        elementBelow.dispatchEvent(this.createMockDragEvent('dragover', this.getDragMoveEvent(event)));
        this.currentOverElement = elementBelow;
      }
    }
  }
  /**
   * Handle the mouseup event
   * @param {MouseEvent} event - The mousedown event
   */
  handleMouseUp(event) {
    //Only drop and dragend if dragging the event was triggerd with button 0 (left-click)
    if (!this.isDragging || event.button !== 0) { return; }

    // Fire drop event if we have a target
    if (this.currentOverElement) {
      this.currentOverElement.dispatchEvent(this.createMockDragEvent('drop', this.getDragUpEvent()));
    }

    const dragImage = document.getElementById('drag-image');

    if (document.body && dragImage && document.body.contains(dragImage)) {
      // Fire dragend event
      this.draggedElement.dispatchEvent(this.createMockDragEvent('dragend', this.getDragUpEvent()));

      // Cleanup
      this.isDragging = false;
      this.hasMoved = false;
      this.dragstart = null;

      document.body.removeChild(dragImage);
      this.ghostElement = null;
      this.draggedElement = null;
      this.currentOverElement = null;
    }

  }

  /**
   * Searches for the nearest ancestor of the provided element that has the draggable attribute set to true.
   * @param {HTMLElement} element - The starting element to begin the search from.
   * @returns {HTMLElement|null} - The draggable ancestor if found, otherwise null.
   */
  findDraggableAncestor(element) {
    while (element && element !== document.body) {
      if (element.getAttribute('draggable') === 'true') {
        return element;
      }
      element = element.parentElement;
    }
    return null;
  }

  /**
   * Create a mock drag event
   * @param {string} type - The event type (event.g. 'dragstart', 'dragend')
   * @param {Object} options - The event options
   * @returns {Event} - The created mock drag event
   */
  createMockDragEvent(type, options) {
    const event = new Event(type, options);
    event.dataTransfer = new MockDataTransfer();
    return event;
  }

  /**
   * Get the drag move event for dragstart and dragover
   * @param {Event} event the event
   * @returns the drag event
   */
  getDragMoveEvent(event) {
    return {
      bubbles: true,
      cancelable: true,
      clientX: event.clientX,
      clientY: event.clientY
    };
  }

  /**
   * Check if a point is inside an element's bounds
   * @param {HTMLElement} element - The element to check
   * @param {number} x - The x-coordinate of the point
   * @param {number} y - The y-coordinate of the point
   * @returns {boolean} - True if the point is inside the element, false otherwise
   */
  isPointInsideElement(element, x, y) {
    const rect = element.getBoundingClientRect();
    return (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    );
  }


  /**
   * Get the drag up event for dragstart and dragover
   * @returns the drag event
   */
  getDragUpEvent() {
    return {
      bubbles: true,
      cancelable: true
    };
  }
}

/**
 * MockDataTransfer class
 *
 * This class mocks the DataTransfer interface, which provides a way to retrieve the data being dragged and the possible actions that can be taken.
 */
class MockDataTransfer {
  constructor() {
    this.dropEffect = 'move';
    this.effectAllowed = 'all';
    this.files = [];
    this.items = [];
    this.types = [];
  }

  /**
   * Set data items and types
   * @param {string} format - The format of the data
   * @param {*} data - The data to set
   */
  setData(format, data) {
    this.items.push({format, data});
    this.types.push(format);
  }

  /**
   * Set data items and types
   * @param {string} format - The format of the data
   * @param {*} data - The data to set
   */
  getData(format) {
    const item = this.items.find(i => i.format === format);
    return item ? item.data : '';
  }

  /**
   * Set data items and types
   * @param {string} format - The format of the data
   * @param {*} data - The data to set
   */
  clearData(format) {
    this.items = this.items.filter(i => i.format !== format);
    this.types = this.types.filter(t => t !== format);
  }


  /**
   * Polyfill for setDragImage done during drag event
   * @param {Element} element
   * @param {number} clientX
   * @param {number} clientY
   */
  setDragImage(element, clientX, clientY) {
    // Create a copy from the styleguide div
    const dragImage = element.cloneNode(true);
    // This id is important to retrieve it from move event
    dragImage.id = 'drag-image';
    // Set initial positions
    dragImage.style.left = `${event.clientX - clientX}px`;
    dragImage.style.top = `${event.clientY - clientY}px`;

    // Insert div to dom
    document.body.appendChild(dragImage);
  }
}

new DragAndDropPolyfill();
