#!/bin/sh
#
#  Make sure I use the correct shell.
#
#PBS -S /bin/sh
#
#  Give the job a name
# 
#PBS -N "MY_GRADS"
#
#  Specify the project the job belongs to
#
#PBS -A nn9280k 
#
#PBS -l walltime=0:20:00,mppwidth=1
#
#  The job needs 8000 MB memory per process:
####PBS -l mppmem=1000mb
#
#
#  Write the standard output of the job to file 'mpijob.out' (optional)
#PBS -o MY_GRADS.out
#
#  Write the standard error of the job to file 'mpijob.err' (optional)
#PBS -e MY_GRADS.err
#
# ##################################################################################

# USAGE: $ qsub -v EXP="TEST" RUN_WRF_HEXAGON.sh

# Export variables
export PATH=$PATH:/usr/local/bin:/usr/etc:~/bin:./

# directory where this script is located:
#cd /work/mki005/ncep_ncar_daily.dir/ftp.cdc.noaa.gov/Datasets/ncep.reanalysis.dailyavgs/pressure/
cd /work/shared/bjerknes/mki005/erai_tnflux_strat.dir/

#./doit 
module load grads
##grads -pbc "run calc_uptpvptpoptp.gs b"
grads -pbc "run calc_tnflux_monthlydata.gs b"

exit $?
