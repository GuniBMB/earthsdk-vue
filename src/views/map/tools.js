const tools = {
    flattenHandler(earth,positions,height){
        // earth.sceneTree.root.remove(flattenObj);
        let flattenObj = {
            "czmObject": {
                "xbsjType": "FlattenedPolygonCollection",
                "xbsjGuid": "93916e9b-82dd-4a56-b15e-27303b08e781",
                "name": "压平多边形组1",
                "polygons": [
                    {
                        "positions":positions,
                        "height": height // 高度
                    }
                ]
            },
            "ref":"testFlatten"
        };
        // eslint-disable-next-line no-console
        console.log("root",earth.sceneTree.root);
        earth.sceneTree.root.children.push(flattenObj);
        let flat = earth.sceneTree.$refs.testFlatten.czmObject;
        flat.polygons[0].showHelper = true; // 是否开启线框显示，编辑状态下，不要开启，二者显示有影响
        flat.polygons[0].editing = true; // 是否开启编辑状态
    }
}
export default tools;