print "module load cdo"

years = range(1979,2017)
for y in years:
   print "cdo -O merge *px*_"+str(y)+".nc *py*_"+str(y)+".nc *pz*_"+str(y)+".nc *div*_"+str(y)+".nc *psiaa*_"+str(y)+".nc erai_tnflux_mondata_strat_"+str(y)+".nc"
