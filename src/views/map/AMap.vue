<template>
    <div id="map">
    </div>
</template>

<script>
    import mapDriver from "@/views/map/driver";
    import tools from "@/views/map/tools";
    export default {
        name: "AMap",
        data(){
            return {}
        },
        created(){
        },
        mounted(){
            // eslint-disable-next-line no-undef
            XE.ready().then(function () {
                mapDriver.ini();
                mapDriver.drawLineString(mapDriver.viewer,function(positions){
                    let ellipsoid = mapDriver.viewer.scene.globe.ellipsoid;
                    let _pois = [];
                    positions.forEach(poi=>{
                       let tmp= ellipsoid.cartesianToCartographic(poi);
                       _pois.push(tmp.longitude,tmp.latitude);
                    });
                    tools.flattenHandler(mapDriver.earth,_pois,70);
                });
            });
        }
    }
</script>

<style scoped lang="less">
/* @test:1px solid red;
    #map{
        border: @test;
    }*/
</style>
