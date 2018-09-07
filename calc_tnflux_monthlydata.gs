function tnfluxi(args)

ibatch=subwrd(args,1)

*martin.king@uni.no, 7 Dec 2016
*mpk change below zsel;
*-------
'reinit'
year=1979
yearend=2016

while (year<=yearend)
 'sdfopen erai_z_mon_'year'.nc'
*
 'sdfopen erai_u_clim_'year'.nc'
 'sdfopen erai_v_clim_'year'.nc'
 'sdfopen erai_z_clim_'year'.nc'
 'sdfopen erai_t_clim_'year'.nc'
*
  'set x 1 144'
  'set y 1 73'
* gas constant
 'define Ra = 290'
* earth radius
 'define a = 6400000'
 'define coslat = cos(lat*3.1415/180)'
 'define sinlat = sin(lat*3.1415/180)'
* Coriolis parameter
 'define f = 2*7.272/100000*sinlat'
 'define f0 = 2*7.272/100000*sin(43*3.1415/180)'
 'define g = 9.81'
 'define scaleheight = Ra*250/g'
 'define kappa = 0.286'
*
* unit [hPa]
* level = 1000, 925, 850, 700, 600, 500, 400, 300, 200, 100, 50
* is doing 3D now zsel = 9
   'set t 1 12'
* is doing 3D now  'set z 'zsel-1' 'zsel+1
   'set z 1 9'
   'set x 1 144'
   'set y 1 73'
*-------calculation part
   'zaa = z.1-z.4'
* QG stream function
   'psiaa = zaa/f'

   'set z 2 8'
*   'set z 'zsel
   'dz = -scaleheight*log(lev(z+1)/lev(z-1))'
   'dTdz = (t.5(z+1)-t.5(z-1))/dz'
*mpk buoyancy frequency
   'stabmdd = g/t.5(z+0)*dTdz+g*kappa/scaleheight'
*
   'one = 1+0*lat'
   'dpsidx = -muadv(one,psiaa)'
   'ddpsidxx = -muadv(one,dpsidx)'
*
   'dpsidy = -mvadv(one,psiaa)'
   'ddpsidyy = -mvadv(one,dpsidy)'
   'ddpsidyx = -muadv(one,dpsidy)'
*
   'dpsidz=(psiaa(z+1)-psiaa(z-1))/dz'
*
   'termxu = dpsidx*dpsidx-psiaa*ddpsidxx'
   'termxv = dpsidx*dpsidy-psiaa*ddpsidyx'
   'termyv = dpsidy*dpsidy-psiaa*ddpsidyy'
   'termzu = dpsidx*dpsidz-psiaa*(-muadv(one,dpsidz))'
   'termzv = dpsidy*dpsidz-psiaa*(-mvadv(one,dpsidz))'
* "p" is normalized by 1000hPa
   'coeff1 = coslat*(lev/1000)/(2*mag(u.2,v.3))'
* x-component
   'px = coeff1*(u.2*termxu + v.3*termxv)'
* y-component
   'py = coeff1*(u.2*termxv + v.3*termyv)'
* z-component
   'pz = coeff1*f*f*(u.2*termzu + v.3*termzv)/stabmdd'
* divergence
   'div = fish_div(px,py)'
* psiaa
   'psia = psiaa'
*
   'set sdfwrite -flt erai_px_mondata_'year'.nc'
   'sdfwrite px'
   'set sdfwrite -flt erai_py_mondata_'year'.nc'
   'sdfwrite py'
   'set sdfwrite -flt erai_pz_mondata_'year'.nc'
   'sdfwrite pz'
   'set sdfwrite -flt erai_div_mondata_'year'.nc'
   'sdfwrite div'
   'set sdfwrite -flt erai_psiaa_mondata_'year'.nc'
   'sdfwrite psia'
 year = year+1
 say year
 'reinit'
endwhile

if (ibatch='b')
 'quit'
endif

return

