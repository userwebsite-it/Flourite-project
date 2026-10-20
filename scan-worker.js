// Textured CPU rasterizer for browsers without WebGL. Uses the actual scan, never substitute geometry.
let meshes=[],tex,tw,th;
onmessage=e=>{const d=e.data;if(d.type==='init'){meshes=d.meshes;tex=d.texture;tw=d.width;th=d.height;postMessage({type:'ready'});}else if(d.type==='texture'){tex=d.pixels}else if(d.type==='render')render(d)};
function render({x,y,zoom,bob,width:w,height:h}){const pixels=new Uint8ClampedArray(w*h*4),depth=new Float32Array(w*h);depth.fill(Infinity);const cx=Math.cos(x),sx=Math.sin(x),cy=Math.cos(y),sy=Math.sin(y),f=h/(2*Math.tan(17*Math.PI/180));
for(const mesh of meshes){const p=mesh.positions,n=mesh.normals,uv=mesh.uvs,idx=mesh.indices,count=p.length/3;const v=new Float32Array(count*5);
for(let i=0;i<count;i++){const j=i*3,k=i*5;const a=(p[j]*cy+p[j+2]*sy)*zoom,b=p[j+1]*zoom,c=(-p[j]*sy+p[j+2]*cy)*zoom;const yy=b*cx-c*sx+bob,zz=b*sx+c*cx,d=6.8-zz;v[k]=w/2+a*f/d;v[k+1]=h/2-yy*f/d;v[k+2]=d;
const nz0=-n[j]*sy+n[j+2]*cy,ny=n[j+1]*cx-nz0*sx,nz=n[j+1]*sx+nz0*cx,nx=n[j]*cy+n[j+2]*sy;
v[k+3]=.79+Math.max(0,ny*.8+nz*.5-nx*.25)*.26+Math.max(0,-ny*.8+nz*.4)*.13;v[k+4]=Math.pow(Math.max(0,ny*.35+nz*.93),24)*.08;}
for(let i=0;i<idx.length;i+=3){const a=idx[i],b=idx[i+1],c=idx[i+2],a5=a*5,b5=b*5,c5=c*5;const ax=v[a5],ay=v[a5+1],bx=v[b5],by=v[b5+1],cxp=v[c5],cyp=v[c5+1];const area=(by-cyp)*(ax-cxp)+(cxp-bx)*(ay-cyp);if(Math.abs(area)<.0001)continue;const minx=Math.max(0,Math.floor(Math.min(ax,bx,cxp))),maxx=Math.min(w-1,Math.ceil(Math.max(ax,bx,cxp))),miny=Math.max(0,Math.floor(Math.min(ay,by,cyp))),maxy=Math.min(h-1,Math.ceil(Math.max(ay,by,cyp)));if(maxx<minx||maxy<miny)continue;
const ia=1/v[a5+2],ib=1/v[b5+2],ic=1/v[c5+2],ua=uv[a*2]*ia,ub=uv[b*2]*ib,uc=uv[c*2]*ic,va=uv[a*2+1]*ia,vb=uv[b*2+1]*ib,vc=uv[c*2+1]*ic;
const dax=(by-cyp)/area,day=(cxp-bx)/area,dbx=(cyp-ay)/area,dby=(ax-cxp)/area;
for(let yy=miny;yy<=maxy;yy++){let aa=((by-cyp)*(minx+.5-cxp)+(cxp-bx)*(yy+.5-cyp))/area,bb=((cyp-ay)*(minx+.5-cxp)+(ax-cxp)*(yy+.5-cyp))/area;for(let xx=minx;xx<=maxx;xx++,aa+=dax,bb+=dbx){const cc=1-aa-bb;if(aa<-.001||bb<-.001||cc<-.001)continue;const iz=aa*ia+bb*ib+cc*ic,d=1/iz,o=yy*w+xx;if(d>=depth[o])continue;depth[o]=d;let u=(aa*ua+bb*ub+cc*uc)*d,t=(aa*va+bb*vb+cc*vc)*d;u=Math.max(0,Math.min(tw-1,Math.round(u*(tw-1))));t=Math.max(0,Math.min(th-1,Math.round(t*(th-1))));const q=(t*tw+u)*4,k=o*4;const light=aa*v[a5+3]+bb*v[b5+3]+cc*v[c5+3],shine=(aa*v[a5+4]+bb*v[b5+4]+cc*v[c5+4])*255;pixels[k]=Math.min(255,tex[q]*light+shine);pixels[k+1]=Math.min(255,tex[q+1]*light+shine);pixels[k+2]=Math.min(255,tex[q+2]*light+shine);pixels[k+3]=255;}}
}}
postMessage({type:'frame',pixels:pixels.buffer,width:w,height:h},[pixels.buffer]);}
