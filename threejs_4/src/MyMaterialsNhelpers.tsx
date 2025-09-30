import * as THREE from "three";

export class MAT {
  static zzz: string = "this is zzz";

  static mat1() {
    // return new THREE.MeshPhysicalMaterial({ color: 0xaaffff, metalness: 0.9, roughness: 0.3, specularIntensity: 1, envMapIntensity: 0.5 });
    // //clearcoat: 1, clearcoatRoughness: 100,
    return new THREE.MeshPhysicalMaterial({ color: 0xff0000, metalness: 0.6, roughness: 0.2, specularIntensity: 1, envMapIntensity: 0.7 })
    
  }

  static mat2() {
    return new THREE.MeshPhysicalMaterial({
      color: 0x00ffff,
      metalness: 0.3,
      roughness: 0.3, //clearcoat: 0.5,
      specularIntensity: 5,
      envMapIntensity: 0.5,
    });
  }

  static mat3() {
    return new THREE.MeshPhysicalMaterial({
      color: 0xff6600,
      metalness: 0.5,
      roughness: 0.4,
      clearcoat: 0.5,
      specularIntensity: 5,
      envMapIntensity: 0.5,
    });
  }

  static redXgreenYblueZaxesTube(length = 8, diameter = 0.4, fontSize = 44) {
    const axesGroup = new THREE.Group();
    const radius = diameter / 2;

    // Helper to create a cylinder aligned between two points
    function createCylinder(
      start: THREE.Vector3,
      end: THREE.Vector3,
      color: number
    ) {
      const direction = new THREE.Vector3().subVectors(end, start);
      const offset = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5);

      const geometry = new THREE.CylinderGeometry(
        radius,
        radius,
        direction.length(),
        8
      );
      const material = new THREE.MeshBasicMaterial({ color });
      const cylinder = new THREE.Mesh(geometry, material);

      cylinder.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.clone().normalize()
      );

      cylinder.position.copy(offset);
      return cylinder;
    }

    // Helper to create a label sprite
    function createLabel(text: string, position: THREE.Vector3) {
      const canvas = document.createElement("canvas");
      const size = fontSize;
      canvas.width = size * 2;
      canvas.height = size * 2;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "black";
      ctx.font = fontSize + "px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("  " + text, size / 2, size / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      //sprite.scale.set(2, 2, 1); // Adjust label size
      sprite.scale.set(6, 6, 1); // Adjust label size
      sprite.position.copy(position);
      return sprite;
    }

    // X Axis - Red
    const xStart = new THREE.Vector3(-length, 0, 0);
    const xEnd = new THREE.Vector3(length, 0, 0);
    axesGroup.add(createCylinder(xStart, xEnd, 0xff0000));
    axesGroup.add(
      createLabel("X-", xStart.clone().add(new THREE.Vector3(-1, 0, 0)))
    );
    axesGroup.add(
      createLabel("X+", xEnd.clone().add(new THREE.Vector3(1, 0, 0)))
    );

    // Y Axis - Green
    const yStart = new THREE.Vector3(0, -length, 0);
    const yEnd = new THREE.Vector3(0, length, 0);
    axesGroup.add(createCylinder(yStart, yEnd, 0x00ff00));
    axesGroup.add(
      createLabel("Y-", yStart.clone().add(new THREE.Vector3(0, -1, 0)))
    );
    axesGroup.add(
      createLabel("Y+", yEnd.clone().add(new THREE.Vector3(0, 1, 0)))
    );

    // Z Axis - Blue
    const zStart = new THREE.Vector3(0, 0, -length);
    const zEnd = new THREE.Vector3(0, 0, length);
    axesGroup.add(createCylinder(zStart, zEnd, 0x0000ff));
    axesGroup.add(
      createLabel("Z-", zStart.clone().add(new THREE.Vector3(0, 0, -1)))
    );
    axesGroup.add(
      createLabel("Z+", zEnd.clone().add(new THREE.Vector3(0, 0, 1)))
    );

    return axesGroup;
  }

  static ZZredXgreenYblueZaxesTube(length = 10, diameter = 0.4) {
    const axesGroup = new THREE.Group();
    const radius = diameter / 2;

    // Helper to create a cylinder aligned between two points
    function createCylinder(start: any, end: any, color: any) {
      const direction = new THREE.Vector3().subVectors(end, start);
      const orientation = new THREE.Matrix4();
      const offset = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5);

      const geometry = new THREE.CylinderGeometry(
        radius,
        radius,
        direction.length(),
        8
      );
      const material = new THREE.MeshBasicMaterial({ color });
      const cylinder = new THREE.Mesh(geometry, material);

      // Align the cylinder with the direction vector
      cylinder.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0), // default up
        direction.clone().normalize()
      );

      cylinder.position.copy(offset);
      return cylinder;
    }

    // X Axis - Red
    axesGroup.add(
      createCylinder(
        new THREE.Vector3(-length, 0, 0),
        new THREE.Vector3(length, 0, 0),
        0xff0000
      )
    );

    // Y Axis - Green
    axesGroup.add(
      createCylinder(
        new THREE.Vector3(0, -length, 0),
        new THREE.Vector3(0, length, 0),
        0x00ff00
      )
    );

    // Z Axis - Blue
    axesGroup.add(
      createCylinder(
        new THREE.Vector3(0, 0, -length),
        new THREE.Vector3(0, 0, length),
        0x0000ff
      )
    );

    return axesGroup;
  }

  static redXgreenYblueZaxesTubezzz(length = 10, diameter = 2) {
    const axesGroup = new THREE.Group();

    // Helper to create a tube along a line
    function createTube(start: any, end: any, color: any) {
      console.log("adsf");
      const path = new THREE.LineCurve3(start, end);
      // const geometry = new THREE.TubeGeometry(path, 1, diameter / 2, 8, false);
      const geometry = new THREE.TubeGeometry(path, 1, 1, 16, false);
      const material = new THREE.MeshBasicMaterial({ color });
      return new THREE.Mesh(geometry, material);
    }

    // X Axis - Red
    const xTube = createTube(
      new THREE.Vector3(-length, 0, 0),
      new THREE.Vector3(length, 0, 0),
      0xff0000
    );
    axesGroup.add(xTube);

    // Y Axis - Green
    const yTube = createTube(
      new THREE.Vector3(0, -length, 0),
      new THREE.Vector3(0, length, 0),
      0x00ff00
    );
    axesGroup.add(yTube);

    // Z Axis - Blue
    const zTube = createTube(
      new THREE.Vector3(0, 0, -length),
      new THREE.Vector3(0, 0, length),
      0x0000ff
    );
    axesGroup.add(zTube);

    return axesGroup;
  }

  static redXgreenYblueZaxes(length = 10) {
    const axesGroup = new THREE.Group();

    // X Axis - Red
    const xMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const xPoints = [
      new THREE.Vector3(-length, 0, 0),
      new THREE.Vector3(length, 0, 0),
    ];
    const xGeometry = new THREE.BufferGeometry().setFromPoints(xPoints);
    const xLine = new THREE.Line(xGeometry, xMaterial);
    axesGroup.add(xLine);

    // Y Axis - Green
    const yMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const yPoints = [
      new THREE.Vector3(0, -length, 0),
      new THREE.Vector3(0, length, 0),
    ];
    const yGeometry = new THREE.BufferGeometry().setFromPoints(yPoints);
    const yLine = new THREE.Line(yGeometry, yMaterial);
    axesGroup.add(yLine);

    // Z Axis - Blue
    const zMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const zPoints = [
      new THREE.Vector3(0, 0, -length),
      new THREE.Vector3(0, 0, length),
    ];
    const zGeometry = new THREE.BufferGeometry().setFromPoints(zPoints);
    const zLine = new THREE.Line(zGeometry, zMaterial);
    axesGroup.add(zLine);

    return axesGroup;
  }
  // static mat2() {
  //     return new THREE.MeshPhysicalMaterial({
  //     color: 0x0066ff,  metalness: 0.9, roughness: 0.1,
  //     clearcoat: 1, clearcoatRoughness: 0.1,
  //     specularIntensity: 1, ior: 2.33, envMapIntensity: 0.5,
  //   })};
}
