#version 440 core

layout(location = 0) in vec3 position;
layout(location = 1) in vec2 coord;

/*
mat4 projection = mat4(1.3737387097273113,0.0,0.0,0.0,0.0,1.3737387097273113,0.0,0.0,0.0,0.0,-1.02020202020202,-1.0,0.0,0.0,-2.0202020202020203,0.0);
mat4 camera = mat4(1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,-2.100090086,1.0);
mat4 model = mat4(1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0);
*/

uniform dmat4 dprojection;
uniform dmat4 dcamera;
uniform dmat4 dmodel;

out vec2 vCoord;

void main(){

    //gl_Position = projection*camera*model*vec4(position,1.0);

    gl_Position = mat4(dprojection)*mat4(dcamera)*mat4(dmodel)*vec4(position,1.0);

    vCoord = coord;

}