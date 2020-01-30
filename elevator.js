class Elevator {
  currentFloor = 0;
  destination = 0;

  startElevator(targetFloor, displayId) {
    this.destination = targetFloor;
    this.currentFloor = targetFloor;
    setInterval(
      function() {
        if (this.currentFloor != this.destination) {
          this.currentFloor < this.destination
            ? this.currentFloor++
            : this.currentFloor--;
          document.getElementById(displayId).innerHTML =
            "Current floor:" + "" + this.currentFloor;
          if (this.destination == this.currentFloor) {
            document
              .getElementsByClassName("floor-button-up")
              [6 - this.currentFloor].classList.remove("btn-waiting-elevator");
            document
              .getElementsByClassName("floor-button-down")
              [6 - this.currentFloor].classList.remove("btn-waiting-elevator");
            document.getElementsByClassName("alert-elevator")[
              6 - this.currentFloor
            ].innerHTML = " - ";
          }
        }
      }.bind(this),
      1000
    );
  }
}

let elevatorA = new Elevator();
let elevatorB = new Elevator();
elevatorA.startElevator(0, "current-floor-A");
elevatorB.startElevator(6, "current-floor-B");

function elevatorAFloorClicked(event) {
  let buttonValue = event.target.innerText;
  if (elevatorA.currentFloor == elevatorA.destination) {
    elevatorA.destination = buttonValue;
  }
}

function elevatorBFloorClicked(event) {
  let buttonValue = event.target.innerText;
  if (elevatorB.currentFloor == elevatorB.destination) {
    elevatorB.destination = buttonValue;
  }
}

class Floor {
  upPressed = false;
  downPressed = false;
}

let floors = [
  new Floor(),
  new Floor(),
  new Floor(),
  new Floor(),
  new Floor(),
  new Floor(),
  new Floor()
];

function floorUpClicked(event) {
  let buttonUpValue = event.target.value;
  if (
    !(
      buttonUpValue == elevatorA.currentFloor ||
      buttonUpValue == elevatorB.currentFloor
    )
  ) {
    event.target.classList.add("btn-waiting-elevator");
    floors[buttonUpValue].upPressed = true;
    elevatorCall(buttonUpValue, event.target.classList);
  } else {
    alert("Elevator is already here");
  }
}

function floorDownClicked(event) {
  let buttonDownValue = event.target.value;
  if (
    !(
      buttonDownValue == elevatorA.currentFloor ||
      buttonDownValue == elevatorB.currentFloor
    )
  ) {
    event.target.classList.add("btn-waiting-elevator");
    floors[buttonDownValue].downPressed = true;
    elevatorCall(buttonDownValue, event.target.classList);
  } else {
    alert("Elevator is already here");
  }
}

function elevatorCall(floor, targetClassList) {
  if (
    elevatorA.currentFloor != elevatorA.destination &&
    elevatorB.currentFloor != elevatorB.destination
  ) {
    targetClassList.remove("btn-waiting-elevator");
    alert("No elevator available!");
    return;
  }
  if (
    elevatorA.currentFloor == elevatorA.destination &&
    elevatorB.currentFloor != elevatorB.destination
  ) {
    elevatorA.destination = floor;
    document.getElementsByClassName("alert-elevator")[6 - floor].innerHTML =
      " A ";
    return;
  }
  if (
    elevatorA.currentFloor != elevatorA.destination &&
    elevatorB.currentFloor == elevatorB.destination
  ) {
    elevatorB.destination = floor;
    document.getElementsByClassName("alert-elevator")[6 - floor].innerHTML =
      " B ";
    return;
  }
  if (
    elevatorA.currentFloor == elevatorA.destination &&
    elevatorB.currentFloor == elevatorB.destination
  ) {
    let distanceA = Math.abs(floor - elevatorA.currentFloor);
    let distanceB = Math.abs(floor - elevatorB.currentFloor);
    if (distanceA < distanceB) {
      elevatorA.destination = floor;
      document.getElementsByClassName("alert-elevator")[6 - floor].innerHTML =
        " A ";
      return;
    }
    if (distanceB < distanceA) {
      elevatorB.destination = floor;
      document.getElementsByClassName("alert-elevator")[6 - floor].innerHTML =
        " B ";
      return;
    }
    if (distanceA == distanceB) {
      if (elevatorA.currentFloor < elevatorB.currentFloor) {
        elevatorA.destination = floor;
        document.getElementsByClassName("alert-elevator")[6 - floor].innerHTML =
          " A ";
      } else {
        elevatorB.destination = floor;
        document.getElementsByClassName("alert-elevator")[6 - floor].innerHTML =
          " B ";
      }
    }
  }
}
