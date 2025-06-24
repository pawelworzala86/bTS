
; programming example

include 'win64a.inc'

format PE64 CONSOLE 5.0
entry start

include 'include\\math.inc'
include 'include\\string.inc'


section '.text' code readable executable

    {{CODE}}

start:
    sub	rsp,8		; Make stack dqword aligned
    
    call F1_main

    invoke	ExitProcess,0

section '.data' data readable writeable
    lf db 13,10,0

    stp1 dq 0.0
    stp2 dq 0.0
    mth1 dq 0.0
    mth2 dq 0.0
    mth3 dq 0.0
    mth4 dq 0.0
    mth5 dq 0.0
    mth6 dq 0.0
    mth7 dq 0.0
    mth8 dq 0.0

    PI dq 3.141592653589793238
    deg2rad dq 0.017453292519943295

    {{DATA}}


section '.idata' import data readable writeable
    include 'idata.inc'