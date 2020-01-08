const mapDriver = {
    earth:null,
    viewer:null,
    drawHandler:undefined,
    ini(){
        this.iniEarth();
    },
    iniEarth(){
        let me = this;
        // eslint-disable-next-line no-undef
        me.earth = new XE.Earth('map');
        me.earth.sceneTree.root = {
            "children": [
                {
                    "czmObject": {
                        "xbsjType": "Imagery",
                        "enabled": true,
                        "name": "谷歌影像",
                        "show": true,
                        "xbsjImageryProvider": {
                            "XbsjImageryProvider": {
                                "url": "//www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}",
                            }
                        }
                    }
                },
                {
                    "czmObject": {
                        "xbsjType": "Tileset",
                        "name": "衡阳市-2",
                        // "url": "http://zhanghui-work:2001/KaiFeng/09/tileset.json",
                        "url":"http://localhost/datas/hengyangshi_ZH/tileset.json",
                        "xbsjFlattenGuid": "93916e9b-82dd-4a56-b15e-27303b08e781",
                        "xbsjClippingPlanes": {}
                    },
                    "ref":"test"
                },
            ]
        }
        me.viewer =me.earth.czm.viewer;
        // console.log("viewer",me.viewer);
        me.earth.sceneTree.$refs.test.czmObject.flyTo();
        //////////////////////////////////////////
        // me.drawLineString(me.viewer)
    },
    // 画线
    drawLineString(viewer, callback) {
        // 取消双击事件-追踪该位置
        viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        this.drawHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        let poly = null;
        let cartesian = null;
        let positions = [];
        let floatingPoint = undefined;
        // 单击事件
        this.drawHandler.setInputAction(movement => {
            let scene = viewer.scene;
            let pickedObject = scene.pick(movement.position);
            if (scene.pickPositionSupported && Cesium.defined(pickedObject)){
                let cartesian = viewer.scene.pickPosition(movement.position);
                if (Cesium.defined(cartesian)) {
                    if (positions.length == 0) {
                        positions.push(cartesian.clone());
                    }
                    positions.push(cartesian);
                    floatingPoint = viewer.entities.add({
                        name: '绘制直线端点',
                        position: positions[positions.length - 1],
                        point: {
                            pixelSize: 5,
                            color: Cesium.Color.RED,
                            outlineColor: Cesium.Color.WHITE,
                            clampToGround: true,
                            outlineWidth: 2,
                        }
                    });
                    // console.log("height",height);
                    // annotate(cartesian, lng, lat, height);
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        // 移动事件
        this.drawHandler.setInputAction(movement => {
            //射线
            // let ray = viewer.camera.getPickRay(movement.endPosition);
            // globe：场景中渲染的球体，包括其地形（球体地形提供程序）和影像图层（球体图像层）。使用场景地球仪访问地球仪。
            // pick（ray, scene, result）：找到光线与渲染的球体表面之间的交点。射线必须以世界坐标给出
            // 获取球面上的点
            // cartesian = viewer.scene.globe.pick(ray, viewer.scene);

            // 获取模型上面的点
            cartesian = viewer.scene.pickPosition(movement.endPosition);
            if (positions.length >= 2) {
                if (!Cesium.defined(poly)) {
                    poly = new PolyLinePrimitive(positions);
                } else {
                    //删除并返回数组的最后一个元素。
                    positions.pop();
                    positions.push(cartesian);
                }
            }
            // eslint-disable-next-line no-undef
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        // 右击事件
        this.drawHandler.setInputAction(() => {
            this.drawHandler.destroy(); //关闭事件句柄
            positions.pop(); //最后一个点无效
            // pathNodeNum = positions.length;
            // _positions = positions;
            // let ellipsoid = viewer.scene.globe.ellipsoid;
            // _distances = driver.getSpaceDistance(positions);
            // rate = parseFloat($('#playSpeed').val().replace(/[^0-9]/ig,""));
            // positions.forEach((poi,index)=>{
            //     let cartographic = ellipsoid.cartesianToCartographic(poi);
            //     let lat = Cesium.Math.toDegrees(cartographic.latitude);
            //     let lng = Cesium.Math.toDegrees(cartographic.longitude);
            //     let height = cartographic.height;
            //     marks.push({
            //         lng,
            //         lat,
            //         height:height+HD,
            //         flytime:index==0?15:_distances[index-1]/rate//做匀速处理，每段路径飞行速度一致，并根据速度赋值飞行时间
            //     })
            // });
            if(!!callback){
                callback(positions);//扩展函数
            }
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        //画线
        let PolyLinePrimitive = (function() {
            function _(positions) {
                this.options = {
                    name: '绘制直线',
                    polyline: {
                        show: true,
                        positions: [],
                        material: Cesium.Color.CHARTREUSE,
                        width: 5,
                        clampToGround: true
                    }
                };
                this.positions = positions;
                this._init();
            }
            _.prototype._init = function() {
                let _self = this;
                let _update = function() {
                    return _self.positions;
                };
                //实时更新polyline.positions
                this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
                viewer.entities.add(this.options);
            };
            return _;
        })();
    },
}
export default mapDriver;
