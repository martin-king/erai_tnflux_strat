# erai_tnflux_strat

This is very similar to the erai_tnflux repository, except for creating values in stratosphere. It was split to troposphere and stratosphere because of file size consideration.

General steps.
1. Download 6 hourly nc data for u, v, t, z.
2. Create monthly means of u, v, t, z with cdo_monmean.py, cdo mergetime them to single files. (eg. erai_u_mon_1979.nc, erai_u_mon_1979_2015.nc)
3. Create climatologies of u, v, t, z with, e.g.,
cdo ymonmean erai_u_mon_1979_2015.nc erai_u_clim.nc.
4. Copy these climatologies files to other years with proper dates using copyedit_climfiles.py. (eg. erai_u_clim_1979.nc)
5. Correct date in erai_z_mon_????.nc in using copyedit_climfiles.py
6. Create the monthly px, py, pz, div, psiaa files with calc_tnflux.gs, use RUN_GRADS.sh to submit to batch.
7. Use cdo_mergemon.py to merge the files from step 6 to erai_tnflux_day_????.nc.
8. cdo mergetime to merge the resulting files to erai_tnflux_mondata_strat_1979_2016.nc
9. ncatted -a comment,global,o,c,"martin.king@uni.no Oct 2017. WAF according to Takaya and Nakamura 2001 JAS. WAF=(px,py,pz), div=DIV(px,py), psia is QG Stream Function." erai_tnflux_mondata_1979_2016.nc
10. nccopy -k 4 -d 1 -s erai_tnflux_mondata_1979_2016.nc erai_tnflux_mondata_1979_2016_netcdf4classic.nc
