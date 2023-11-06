export const DemoShowSubs = `
1
00:00:01,000 --> 00:00:01,033
ANNOUNCE {"text":"Welcome to our show","duration":3}
ANIMATE djTable {"animationName":"deckTableOn", "loop":true,"bpmSync":true}
DEFINE TARGET_GROUP all_dotLights dotLight01,dotLight02,dotLight03,dotLight04,dotLight05,dotLight06,dotLight07,dotLight08,dotLight09,dotLight10,dotLight11,dotLight12,dotLight13

2
00:00:01,533 --> 00:00:02,000
BPM110
ANIMATE speakerL {"animationName":"L1", "loop":true,"bpmSync":true}
ANIMATE speakerR {"animationName":"L1", "loop":true,"bpmSync":true}
ANIMATE dotLight01 {"animationName":"green", "loop":true}
ANIMATE dotLight13 {"animationName":"green", "loop":true}

3
00:00:02,100 --> 00:00:02,500
ANIMATE dotLight02 {"animationName":"green", "loop":true}
ANIMATE dotLight12 {"animationName":"green", "loop":true}
START_MODEL_WHITERABBIT_1

4
00:00:02,666 --> 00:00:02,933
ANIMATE dotLight03 {"animationName":"green", "loop":true}
ANIMATE dotLight11 {"animationName":"green", "loop":true}

5
00:00:03,200 --> 00:00:03,600
ANIMATE dotLight04 {"animationName":"green", "loop":true}
ANIMATE dotLight10 {"animationName":"green", "loop":true}
START_MODEL_WHITERABBIT_2

6
00:00:03,733 --> 00:00:04,133
ANIMATE dotLight05 {"animationName":"green", "loop":true}
ANIMATE dotLight09 {"animationName":"green", "loop":true}

7
00:00:04,300 --> 00:00:04,666

ANIMATE dotLight06 {"animationName":"green", "loop":true}
ANIMATE dotLight08 {"animationName":"green", "loop":true}

8
00:00:04,833 --> 00:00:05,133
ANIMATE dotLight07 {"animationName":"green", "loop":true}

9
00:00:05,400 --> 00:00:05,666
ANIMATE all_dotLights {"animationName":"off"}

10
00:00:05,900 --> 00:00:06,900
ANIMATE speakerL {"animationName":"L0", "loop":true,"bpmSync":true} 
ANIMATE speakerR {"animationName":"L0", "loop":true,"bpmSync":true}
ANIMATE all_dotLights {"animationName":"cyan", "loop":true}

11
00:00:09,700 --> 00:00:10,700
ANIMATE all_dotLights {"animationName":"yellow", "loop":true,"bpmSync":true}

12
00:00:14,633 --> 00:00:15,800
ANIMATE parLight {"animationName":"L1", "loop":true,"bpmSync":true}
ANIMATE all_dotLights {"animationName":"flash", "loop":true,"bpmSync":true}
ANIMATE speakerL {"animationName":"L1", "loop":true,"bpmSync":true}
ANIMATE speakerR {"animationName":"L1", "loop":true,"bpmSync":true}

13
00:00:17,400 --> 00:00:18,400
ANIMATE all_dotLights {"animationName":"flash", "loop":true,"bpmSync":true}

14
00:00:20,666 --> 00:00:21,666
ANIMATE parLight {"animationName":"L2", "loop":true,"bpmSync":true}
ANIMATE all_dotLights {"animationName":"yellow", "loop":true,"bpmSync":true}

15
00:00:25,433 --> 00:00:26,433
STOPALL

999
00:00:28,0 --> 00:00:28,0
END_OF_SHOW

`
