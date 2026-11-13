// ==UserScript==
// @name         Google Scholar CCF 等级
// @namespace    https://github.com/mxd/ccf-scholar
// @version      1.3.0
// @description  在 Google Scholar 搜索结果标题旁显示 CCF（第七版，2026）推荐等级，区分期刊/会议，未收录的标注 N/A，截断的会议名用「引用」信息补全
// @author       mxd
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAkFBMVEUZKzEfICIXGBsfISSWlphyc3UbT5ZPLCCsIh/DiQl/gIHf3+A/QEN+foC/wMEgISQYZ9PGIh/3qgAAAAAXICQTGCX8/PwVFhkgHBf+tAByIiGNZhEcRHsgISQ1Njjo6OnDxMQbGxtWVlm2t7ikpaYmJiYgISPV1dZISUtnaGq/v8AfISMdPGYgISRyVRaIiIq349UZAAAAMHRSTlMWUuWi///////////////+////APz//////////9H///8P////Cnn/////gP+0//+57oBWAAAEDUlEQVR42u2bC2+bMBDHTQJN2m5zm9g4aQeEVyBLk3z/bzfbPEoeUEMNl0r81UmVO/l+vjufLeRDywsh8Q9tDw7BGkWcwxahfPore+eKjamDe5EzNeLlVwDxvifrOcM+bgBAy3iLe9c2vjBakcFXT/o1z6d3jDoP7PFA2t8E8A94MB38awDf6dv71Tg4/iXAkPbPCBCE/SpBDnAY1r4gOFQqL8//ge0Lgv2yrM0GBpFReCCewABM4hzAGD4AWRCMDABhMCEJsIVxgHDBVgD4DpwHeDFAUFug2AhoOYWKgIjBdIl8AukB4iOEQcXvv7AAWzSFBZiihjJMtKmhHCPSkKNvmtSwz0h9DpLZ/FWT5rN6gloA8vaqUW+kLQDBr1pVGwU0iAMaXFALMNcLMP95AOAhgE5C8G0IX4gGKsVNAIMcRhj4PnLnAFSbugFQfHzXoiOmXQDocbHWpMWRtgegx/VCm9b1BHUAdLbQqhltC/C+1ml//d4a4FEvwOPPAwAPAXQSgm9D+EIEX4rhD6PxPoDxSpM6Aqzwx18t+sCrLgCrjxdt+li1B9Bpv4mgDmBFXrSKrNoCPOgFeBgBfh4AdBKCb0P4QgRfiuEPo/E+MAKMACPACDACjAAjwAgwAtwS4zr/5ETF0EAAhDE3CFJcMchH0iBwixFWlXYAhq2NzeVFKSP56q3QE0N/dtIeMzefCtUeSKkDsDSxC51IRhSWI5H4GMk2dkVNnyc7ALCAz/l8CgLL5IveMWFfEEW7IDjxX0wxwoEiM8pk6vUAcz2xTBlcNwmlw/l6N24W7iiRHvjH1z0pcoBozQG5uHwDsOzHsu0EZ6nGqCuROIBLe9kFLOXJVwZVfPwlmLskLVNd/kkCsH4ATJ55Z1OznW2HF8Z6BKDJ5dQsylLxCqCXEDCXx/s8qUQK/rrpga8/0XcASC/9TXkKeJc7XQCk2M3rpiIAUS0C0RVAcvXfRCHyMllquUDQpCOAWwdQFEs1gInag0YBoBgCa5cpVQOYqj3pFDmwOZuRiDrs3gAoK6FaCmzVHrXeWK8ojcH3tyFSfNZ7bY6dsgPoe4WI+IoPm0XhryQBzaLyXA1JBwD5sFntabeIwacLmDyMeMqfJuUIJV08YCg/bme/+Q53JyLAdBIkPMeFC+xdNsJPaLHvWwPIx+2Kz/tFFniWuBC4/GBKaJYFtikuBNjypOWWAPnzfsUGByrvX94mlNVORkMS2HxE3AufaAbZygOoTYsHZU9eXuXC3ArbFdfEJCjuSOoAZYuHcpMLwzsz3ISnlH1mYyBGzIDIEcqv6C2aBcomF+UeB3pd5M5HlG+C+Ra4m0Yn6Fave2h2A2/3g294hG/5hG96vYO2X/jGZ+jW77tofh+8/f8/6mYmEFHI2bgAAAAASUVORK5CYII=
// @icon64       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAkFBMVEUgISTHIh8ZZ9QAAAAUFRr3qgAaIST/sQATGyRLIiJYRBwgHRsiNU/6+vseMlAgISR0dXc0NTchISVGR0rn5+dnaGoICQxTVFYAAD8eHiKFhYcaWrSoIiDSkwfZ2dnKyssAAFUeHiYbIiIfICIfICMbUJkZbuMgICQhISWPIiGVlpeyfgy2trenqKl/f4EAAADyQiqEAAAAMHRSTlP+//8A///////////////I//9U//////8EQf///////wMhJZPR//8/kP///////wCUmaS4AAAB6klEQVR42u2XXVfCMAyGo8RSlbh13YdM2PhUQPT//zzTDdQdV41U7nxv6MXynLdJTklgcFSyiUCoaJO8h8ExXBx9YCSfAPeDxS/DG8SCAxvA/WAMJ2nsCM7BE5yop9bBHE7WvAFEpwMiB0ggQMkAZqsQwGoGYwjSGJZhgCV0UqhE6qSxg1NwLRAonx0FkwuBJl6C2l6ItPVamMgAEziXg+Ac/EEVlBZI+QkabgTiz7zx06FAUy9BPw+vBBo+ey1Mr0SawrkcBOcguArcCSiQ8sffwkgg/sxr4OFSoAevhdv1owTwuPZaEBlgC+dzEJoDTu+dQN9UgRECwb/+JRai7h6+jBY/hBsL7ulpDw7R/CmJ44uKKC35YGsi2gFmVcqqQIbAjPZ2VFYGLdWFiVObxxRnLBBdQgPtc348QWNau1eUkTFB/v172jUwwvYmVGDzr+0ACNIc4kvaXhVLOlyaAQYMCBG4rxoDkO8+AZwK7Bu4hQ4KWxQ9RYh6Rl2OM/qQDItHALcE6r5R9+uwjYbKnH80Ar3knEFscqA9w3bPuI87ihXaKuPyl8yrX3MfgMf9voWDCWlKe6P4NpRSbb2AxLPyoIlj23SQyeLCNZDtLWHkXbraBvw46P4mnP/N2he+eIauvuHLd9D6/wYljDDnbGzlCAAAAABJRU5ErkJggg==
// @match        https://scholar.google.com/*
// @match        https://scholar.google.com.hk/*
// @include      *://scholar.google.*/*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @noframes
// ==/UserScript==

(function () {
  'use strict';

  /* ==================== 1. CCF 目录数据（第七版，2026） ====================
     每行: [简称, 全称, 类型(j=期刊/c=会议), 等级(A/B/C), 所属领域]
  */
  const CCF_RAW = [["TOCS","ACM Transactions on Computer Systems","j","A","计算机体系结构/并行与分布计算/存储系统"],["TOS","ACM Transactions on Storage","j","A","计算机体系结构/并行与分布计算/存储系统"],["TCAD","IEEE Transactions on Computer-Aided Design of Integrated Circuits and Systems","j","A","计算机体系结构/并行与分布计算/存储系统"],["TC","IEEE Transactions on Computers","j","A","计算机体系结构/并行与分布计算/存储系统"],["TPDS","IEEE Transactions on Parallel and Distributed Systems","j","A","计算机体系结构/并行与分布计算/存储系统"],["TACO","ACM Transactions on Architecture and Code Optimization","j","A","计算机体系结构/并行与分布计算/存储系统"],["TAAS","ACM Transactions on Autonomous and Adaptive Systems","j","B","计算机体系结构/并行与分布计算/存储系统"],["TODAES","ACM Transactions on Design Automation of Electronic Systems","j","B","计算机体系结构/并行与分布计算/存储系统"],["TECS","ACM Transactions on Embedded Computing Systems","j","B","计算机体系结构/并行与分布计算/存储系统"],["TRETS","ACM Transactions on Reconfigurable Technology and Systems","j","B","计算机体系结构/并行与分布计算/存储系统"],["TVLSI","IEEE Transactions on Very Large Scale Integration(VLSI) Systems","j","B","计算机体系结构/并行与分布计算/存储系统"],["JPDC","Journal of Parallel and Distributed Computing","j","B","计算机体系结构/并行与分布计算/存储系统"],["JSA","Journal of Systems Architecture: Embedded Software Design","j","B","计算机体系结构/并行与分布计算/存储系统"],["","Parallel Computing","j","B","计算机体系结构/并行与分布计算/存储系统"],["","Performance Evaluation: An International Journal","j","B","计算机体系结构/并行与分布计算/存储系统"],["TCC","IEEE Transactions on Cloud Computing","j","B","计算机体系结构/并行与分布计算/存储系统"],["JETC","ACM Journal on Emerging Technologies in Computing Systems","j","C","计算机体系结构/并行与分布计算/存储系统"],["","Concurrency and Computation: Practice and Experience","j","C","计算机体系结构/并行与分布计算/存储系统"],["DC","Distributed Computing","j","C","计算机体系结构/并行与分布计算/存储系统"],["FGCS","Future Generation Computer Systems","j","C","计算机体系结构/并行与分布计算/存储系统"],["Integration","Integration, the VLSIJournal","j","C","计算机体系结构/并行与分布计算/存储系统"],["JETTA","Journal of Electronic Testing-Theory and Applications","j","C","计算机体系结构/并行与分布计算/存储系统"],["JGC","Journal of Gridcomputing","j","C","计算机体系结构/并行与分布计算/存储系统"],["RTS","Real-Time Systems","j","C","计算机体系结构/并行与分布计算/存储系统"],["TJSC","The Journal of Supercomputing","j","C","计算机体系结构/并行与分布计算/存储系统"],["TCASI","IEEE Transactions on Circuits and Systems I: Regular Papers","j","C","计算机体系结构/并行与分布计算/存储系统"],["CCF- THPC","CCFTransactions on High Performance Computing","j","C","计算机体系结构/并行与分布计算/存储系统"],["TSUSC","IEEE Transactions on Sustainable Computing","j","C","计算机体系结构/并行与分布计算/存储系统"],["PPoPP","ACMSIGPLANSymposium on Principles & Practice of Parallel Programming","c","A","计算机体系结构/并行与分布计算/存储系统"],["FAST","USENIX Conference on File and Storage Technologies","c","A","计算机体系结构/并行与分布计算/存储系统"],["DAC","Design Automation Conference","c","A","计算机体系结构/并行与分布计算/存储系统"],["HPCA","IEEE International Symposium on High Performance Computer Architecture","c","A","计算机体系结构/并行与分布计算/存储系统"],["MICRO","IEEE/ACM International Symposium on Microarchitecture","c","A","计算机体系结构/并行与分布计算/存储系统"],["SC","International Conference for High Performance Computing, Networking, Storage, and Analysis","c","A","计算机体系结构/并行与分布计算/存储系统"],["ASPLOS","International Conference on Architectural Support for Programming Languages and Operating Systems","c","A","计算机体系结构/并行与分布计算/存储系统"],["ISCA","International Symposium on Computer Architecture","c","A","计算机体系结构/并行与分布计算/存储系统"],["ACMSIGOPSATC （原USENIXATC）","ACMSIGOPSAnnual Technical Conference","c","A","计算机体系结构/并行与分布计算/存储系统"],["EuroSys","European Conference on Computer Systems","c","A","计算机体系结构/并行与分布计算/存储系统"],["HPDC","The International ACM Symposium on High-Performance Parallel and Distributed Computing","c","A","计算机体系结构/并行与分布计算/存储系统"],["SoCC","ACM Symposium on Cloud Computing","c","B","计算机体系结构/并行与分布计算/存储系统"],["SPAA","ACM Symposium on Parallelism in Algorithms and Architectures","c","B","计算机体系结构/并行与分布计算/存储系统"],["PODC","ACM Symposium on Principles of Distributed Computing","c","B","计算机体系结构/并行与分布计算/存储系统"],["FPGA","ACM/SIGDAInternational Symposium on Field-Programmable Gate Arrays","c","B","计算机体系结构/并行与分布计算/存储系统"],["CGO","The International Symposium on Code Generation and Optimization","c","B","计算机体系结构/并行与分布计算/存储系统"],["DATE","Design, Automation & Test in Europe","c","B","计算机体系结构/并行与分布计算/存储系统"],["HOT CHIPS","Hot Chips: ASymposium on High Performance Chips","c","B","计算机体系结构/并行与分布计算/存储系统"],["CLUSTER","IEEE International Conference on Cluster Computing","c","B","计算机体系结构/并行与分布计算/存储系统"],["ICCD","International Conference on Computer Design","c","B","计算机体系结构/并行与分布计算/存储系统"],["ICCAD","International Conference on Computer-Aided Design","c","B","计算机体系结构/并行与分布计算/存储系统"],["ICDCS","IEEE International Conference on Distributed Computing Systems","c","B","计算机体系结构/并行与分布计算/存储系统"],["CODES+ ISSS","International Conference on Hardware/Software Co-design and System Synthesis","c","B","计算机体系结构/并行与分布计算/存储系统"],["HiPEAC","International Conference on High Performance and Embedded Architectures and Compilers","c","B","计算机体系结构/并行与分布计算/存储系统"],["SIG- METRICS","International Conference on Measurement and Modeling of Computer Systems","c","B","计算机体系结构/并行与分布计算/存储系统"],["PACT","International Conference on Parallel Architectures and Compilation Techniques","c","B","计算机体系结构/并行与分布计算/存储系统"],["ICPP","International Conference on Parallel Processing","c","B","计算机体系结构/并行与分布计算/存储系统"],["ICS","International Conference on Supercomputing","c","B","计算机体系结构/并行与分布计算/存储系统"],["VEE","International Conference on Virtual Execution Environments","c","B","计算机体系结构/并行与分布计算/存储系统"],["IPDPS","IEEE International Parallel & Distributed Processing Symposium","c","B","计算机体系结构/并行与分布计算/存储系统"],["Performance","International Symposium on Computer Performance, Modeling, Measurements and Evaluation","c","B","计算机体系结构/并行与分布计算/存储系统"],["ITC","International Test Conference","c","B","计算机体系结构/并行与分布计算/存储系统"],["LISA","Large Installation System Administration Conference","c","B","计算机体系结构/并行与分布计算/存储系统"],["MSST","Mass Storage Systems and Technologies","c","B","计算机体系结构/并行与分布计算/存储系统"],["RTAS","IEEE Real-Time and Embedded Technology and Applications Symposium","c","B","计算机体系结构/并行与分布计算/存储系统"],["Euro-Par","European Conference on Parallel and Distributed Computing Springer","c","B","计算机体系结构/并行与分布计算/存储系统"],["ISCAS","IEEE International Symposium on Circuits and Systems","c","B","计算机体系结构/并行与分布计算/存储系统"],["CF","ACM International Conference on Computing Frontiers","c","C","计算机体系结构/并行与分布计算/存储系统"],["SYSTOR","ACM International Systems and Storage Conference","c","C","计算机体系结构/并行与分布计算/存储系统"],["NOCS","ACM/IEEE International Symposium on Networks-on-Chip","c","C","计算机体系结构/并行与分布计算/存储系统"],["ASAP","IEEE International Conference on Application-Specific Systems, Architectures, and Processors","c","C","计算机体系结构/并行与分布计算/存储系统"],["ASP-DAC","Asia and South Pacific Design Automation Conference","c","C","计算机体系结构/并行与分布计算/存储系统"],["ETS","IEEE European Test Symposium","c","C","计算机体系结构/并行与分布计算/存储系统"],["FPL","International Conference on Field-Programmable Logic and Applications","c","C","计算机体系结构/并行与分布计算/存储系统"],["FCCM","IEEE Symposium on Field-Programmable Custom Computing Machines","c","C","计算机体系结构/并行与分布计算/存储系统"],["GLSVLSI","Gre at Lakes Symposium on VLSI","c","C","计算机体系结构/并行与分布计算/存储系统"],["ATS","IEEE Asian Test Symposium","c","C","计算机体系结构/并行与分布计算/存储系统"],["HPCC","IEEE International Conference on High Performance Computing and Communications","c","C","计算机体系结构/并行与分布计算/存储系统"],["HiPC","IEEE International Conference on High Performance Computing, Data and Analytics","c","C","计算机体系结构/并行与分布计算/存储系统"],["MASCOTS","International Symposium on Modeling, Analysis, and Simulation of Computer and Telecommunication Systems","c","C","计算机体系结构/并行与分布计算/存储系统"],["ISPA","IEEE International Symposium on Parallel and Distributed Processing with Applications","c","C","计算机体系结构/并行与分布计算/存储系统"],["CCGRID","IEEE/ACM International Symposium on Cluster, Cloud and Grid Computing","c","C","计算机体系结构/并行与分布计算/存储系统"],["NPC","IFIP International Conference on Network and Parallel Computing","c","C","计算机体系结构/并行与分布计算/存储系统"],["ICA3PP","International Conference on Algorithms and Architectures for Parallel Processing","c","C","计算机体系结构/并行与分布计算/存储系统"],["CASES","International Conference on Compilers, Architectures, and Synthesis for Embedded Systems","c","C","计算机体系结构/并行与分布计算/存储系统"],["FPT","International Conference on Field-Programmable Technology","c","C","计算机体系结构/并行与分布计算/存储系统"],["ICPADS","International Conference on Parallel and Distributed Systems","c","C","计算机体系结构/并行与分布计算/存储系统"],["ISLPED","International Symposium on Low Power Electronics and Design","c","C","计算机体系结构/并行与分布计算/存储系统"],["ISPD","International Symposium on Physical Design","c","C","计算机体系结构/并行与分布计算/存储系统"],["HOTI","IEEE Symposium on High-Performance Interconnects","c","C","计算机体系结构/并行与分布计算/存储系统"],["VTS","IEEEVLSITest Symposium","c","C","计算机体系结构/并行与分布计算/存储系统"],["ITC-Asia","International Test Conference in Asia","c","C","计算机体系结构/并行与分布计算/存储系统"],["SEC","ACM/IEEE Symposium on Edge Computing","c","C","计算机体系结构/并行与分布计算/存储系统"],["NAS","International Conference on Networking, Architecture and Storages","c","C","计算机体系结构/并行与分布计算/存储系统"],["HotStorage","Hot Storage","c","C","计算机体系结构/并行与分布计算/存储系统"],["APPT","International Symposium on Advanced Parallel Processing Technology","c","C","计算机体系结构/并行与分布计算/存储系统"],["JCC","International Conference on Joint Cloud Computing","c","C","计算机体系结构/并行与分布计算/存储系统"],["JSAC","IEEE Journal on Selected Areas in Communications","j","A","计算机网络"],["TMC","IEEE Transactions on Mobile Computing","j","A","计算机网络"],["TON","IEEE Transactions on Networking （原IEEE/ACM Transactions on Networking）","j","A","计算机网络"],["TOIT","ACM Transactions on Internet Technology","j","B","计算机网络"],["TOMM","ACM Transactions on Multimedia Computing, Communications and Applications","j","B","计算机网络"],["TOSN","ACM Transactions on Sensor Networks","j","B","计算机网络"],["CN","Computer Networks","j","B","计算机网络"],["TCOM","IEEE Transactions on Communications","j","B","计算机网络"],["TWC","IEEE Transactions on Wireless Communications","j","B","计算机网络"],["","Ad Hoc Networks","j","C","计算机网络"],["CC","Computer Communications","j","C","计算机网络"],["TNSM","IEEE Transactions on Network and Service Management","j","C","计算机网络"],["","IET Communications","j","C","计算机网络"],["JNCA","Journal of Network and Computer Applications","j","C","计算机网络"],["MONET","Mobile Networks and Applications","j","C","计算机网络"],["","Networks","j","C","计算机网络"],["PPNA","Peer-to-Peer Networking and Applications","j","C","计算机网络"],["WCMC","Wireless Communications and Mobile Computing","j","C","计算机网络"],["","Wireless Networks","j","C","计算机网络"],["IOT","IEEE Internet of Things Journal","j","C","计算机网络"],["TIOT","ACM Transactions on Internet of Things","j","C","计算机网络"],["SIGCOMM","ACM International Conference on Applications, Technologies, Architectures, and Protocols for Computer Communication","c","A","计算机网络"],["MobiCom","ACM International Conference on Mobile Computing and Networking","c","A","计算机网络"],["INFOCOM","IEEE International Conference on Computer Communications","c","A","计算机网络"],["NSDI","Symposium on Network System Design and Implementation","c","A","计算机网络"],["SenSys","ACM Conference on Embedded Networked Sensor Systems","c","B","计算机网络"],["CoNEXT","ACM International Conference on Emerging Networking Experiments and Technologies","c","B","计算机网络"],["SECON","IEEE International Conference on Sensing, Communication, and Networking","c","B","计算机网络"],["IPSN","International Conference on Information Processing in Sensor Networks","c","B","计算机网络"],["MobiSys","ACM International Conference on Mobile Systems, Applications, and Services","c","B","计算机网络"],["ICNP","IEEE International Conference on Network Protocols","c","B","计算机网络"],["MobiHoc","International Symposium on Theory, Algorithmic Foundations, and Protocol Design for Mobile Networks and Mobile Computing","c","B","计算机网络"],["NOSSDAV","International Workshop on Network and Operating System Support for Digital Audio and Video","c","B","计算机网络"],["IWQoS","IEEE/ACM International Workshop on Quality of Service","c","B","计算机网络"],["IMC","ACM Internet Measurement Conference","c","B","计算机网络"],["ANCS","ACM/IEEE Symposium on Architectures for Networking and Communication Systems","c","C","计算机网络"],["APNOMS","Asia-Pacific Network Operations and Management Symposium","c","C","计算机网络"],["FORTE","International Conference on Formal Techniques for Distributed Objects, Components, and Systems","c","C","计算机网络"],["LCN","IEEE Conference on Local Computer Networks","c","C","计算机网络"],["GLOBECOM","IEEE Global Communications Conference","c","C","计算机网络"],["ICC","IEEE International Conference on Communications","c","C","计算机网络"],["ICCCN","IEEE International Conference on Computer Communications and Networks","c","C","计算机网络"],["MASS","IEEE International Conference on Mobile Adhoc and Sensor Systems","c","C","计算机网络"],["P2P","IEEE International Conference on Peer-to-Peer Computing","c","C","计算机网络"],["IPCCC","IEEE International Performance Computing and Communications Conference","c","C","计算机网络"],["WoWMoM","IEEE International Symposium on a World of Wireless, Mobile and Multimedia Networks","c","C","计算机网络"],["ISCC","IEEE Symposium on Computers and Communications","c","C","计算机网络"],["WCNC","IEEE Wireless Communications and Networking Conference","c","C","计算机网络"],["Networking","IFIP International Conferences on Networking","c","C","计算机网络"],["IM","IFIP/IEEE International Symposium on Integrated Network Management","c","C","计算机网络"],["MSN","International Conference on Mobility, Sensing and Networking","c","C","计算机网络"],["MSWiM","International Conference on Modeling, Analysis and Simulation of Wireless and Mobile Systems","c","C","计算机网络"],["WASA","The International Conference on Wireless Artificial Intelligent Computing Systems and Applications","c","C","计算机网络"],["HotNets","ACM The Workshop on Hot Topics in Networks","c","C","计算机网络"],["APNet","Asia-Pacific Workshop on Networking","c","C","计算机网络"],["TDSC","IEEE Transactions on Dependable and Secure Computing","j","A","网络与信息安全"],["TIFS","IEEE Transactions on Information Forensics and Security","j","A","网络与信息安全"],["","Journal of Cryptology","j","A","网络与信息安全"],["TOPS","ACM Transactions on Privacy and Security","j","B","网络与信息安全"],["","Computers & Security","j","B","网络与信息安全"],["","Designs, Codes and Cryptography","j","B","网络与信息安全"],["JCS","Journal of Computer Security","j","B","网络与信息安全"],["Cybersecurity","Cybersecurity","j","B","网络与信息安全"],["CLSR","Computer Law & Security Review","j","C","网络与信息安全"],["","EURASIPJournal on Information Security","j","C","网络与信息安全"],["","IET Information Security","j","C","网络与信息安全"],["IMCS","Information and Computer Security","j","C","网络与信息安全"],["IJICS","International Journal of Information and Computer Security","j","C","网络与信息安全"],["IJISP","International Journal of Information Security and Privacy","j","C","网络与信息安全"],["JISA","Journal of Information Security and Applications","j","C","网络与信息安全"],["SCN","Security and Communication Networks","j","C","网络与信息安全"],["HCC","High-Confidence Computing","j","C","网络与信息安全"],["CCS","ACM Conference on Computer and Communications Security","c","A","网络与信息安全"],["EUROCRYPT","International Conference on the Theory and Applications of Cryptographic Techniques","c","A","网络与信息安全"],["S&P","IEEE Symposium on Security and Privacy","c","A","网络与信息安全"],["CRYPTO","International Cryptology Conference","c","A","网络与信息安全"],["USENIXSecurity","USENIX Security Symposium","c","A","网络与信息安全"],["NDSS","Network and Distributed System Security Symposium","c","A","网络与信息安全"],["ACSAC","Annual Computer Security Applications Conference","c","B","网络与信息安全"],["ASIACRYPT","Annual International Conference on the Theory and Application of Cryptology and Information Security","c","B","网络与信息安全"],["ESORICS","European Symposium on Research in Computer Security","c","B","网络与信息安全"],["FSE","Fast Software Encryption","c","B","网络与信息安全"],["CSFW","IEEE Computer Security Foundations Workshop","c","B","网络与信息安全"],["SRDS","IEEE International Symposium on Reliable Distributed Systems","c","B","网络与信息安全"],["CHES","International Conference on Cryptographic Hardware and Embedded Systems","c","B","网络与信息安全"],["DSN","International Conference on Dependable Systems and Networks","c","B","网络与信息安全"],["RAID","International Symposium on Recent Advances in Intrusion Detection","c","B","网络与信息安全"],["PKC","International Workshop on Practice and Theory in Public Key Cryptography","c","B","网络与信息安全"],["TCC","Theory of Cryptography Conference","c","B","网络与信息安全"],["WiSec","ACM Conference on Security and Privacy in Wireless and Mobile Networks","c","C","网络与信息安全"],["SACMAT","ACM Symposium on Access Control Models and Technologies","c","C","网络与信息安全"],["DRM","ACM Workshop on Digital Rights Management","c","C","网络与信息安全"],["IH&MMSec","ACM Workshop on Information Hiding and Multimedia Security","c","C","网络与信息安全"],["ACNS","International Conference on Applied Cryptography and Network Security","c","C","网络与信息安全"],["AsiaCCS","ACM Asia Conference on Computer and Communications Security","c","C","网络与信息安全"],["ACISP","Australasia Conference on Information Security and Privacy","c","C","网络与信息安全"],["CT-RSA","The Cryptographer's Track at RSAConference","c","C","网络与信息安全"],["DIMVA","Conference on Detection of Intrusions and Malware & Vulnerability Assessment","c","C","网络与信息安全"],["DFRWS","Digital Forensic Research Workshop","c","C","网络与信息安全"],["FC","Financial Cryptography and Data Security","c","C","网络与信息安全"],["TrustCom","IEEE International Conference on Trust, Security and Privacy in Computing and Communications","c","C","网络与信息安全"],["SEC","IFIP International Information Security Conference","c","C","网络与信息安全"],["IFIPWG11.9","IFIP Working Group11.9 International Conference on Digital Forensics","c","C","网络与信息安全"],["ISC","Information Security Conference","c","C","网络与信息安全"],["ICDF2C","International Conference on Digital Forensics & Cyber Crime","c","C","网络与信息安全"],["ICICS","International Conference on Information and Communications Security","c","C","网络与信息安全"],["SecureComm","International Conference on Security and Privacy in Communication Networks","c","C","网络与信息安全"],["NSPW","New Security Paradigms Workshop","c","C","网络与信息安全"],["PAM","Passive and Active Measurement Conference","c","C","网络与信息安全"],["PETS","Privacy Enhancing Technologies Symposium","c","C","网络与信息安全"],["SAC","Selected Areas in Cryptography","c","C","网络与信息安全"],["SOUPS","Symposium On Usable Privacy and Security","c","C","网络与信息安全"],["HotSec","USENIX Workshop on Hot Topics in Security","c","C","网络与信息安全"],["EuroS&P","IEEE European Symposium on Security and Privacy","c","C","网络与信息安全"],["Inscrypt","International Conference on Information Security and Cryptology","c","C","网络与信息安全"],["CODASPY","Conference on Data and Application Security and Privacy","c","C","网络与信息安全"],["BlockSys","International Conference on Blockchain, Artificial Intelligence, and Trustworthy Systems","c","C","网络与信息安全"],["CSCloud","International Conference on Cyber Security and Cloud Computing","c","C","网络与信息安全"],["TOPLAS","ACM Transactions on Programming Languages and Systems","j","A","软件工程/系统软件/程序设计语言"],["TOSEM","ACM Transactions on Software Engineering and Methodology","j","A","软件工程/系统软件/程序设计语言"],["TSE","IEEE Transactions on Software Engineering","j","A","软件工程/系统软件/程序设计语言"],["TSC","IEEE Transactions on Services Computing","j","A","软件工程/系统软件/程序设计语言"],["ASE","Automated Software Engineering","j","B","软件工程/系统软件/程序设计语言"],["ESE","Empirical Software Engineering","j","B","软件工程/系统软件/程序设计语言"],["IETS","IET Software","j","B","软件工程/系统软件/程序设计语言"],["IST","Information and Software Technology","j","B","软件工程/系统软件/程序设计语言"],["JFP","Journal of Functional Programming","j","B","软件工程/系统软件/程序设计语言"],["","Journal of Software: Evolution and Process","j","B","软件工程/系统软件/程序设计语言"],["JSS","Journal of Systems and Software","j","B","软件工程/系统软件/程序设计语言"],["RE","Requirements Engineering","j","B","软件工程/系统软件/程序设计语言"],["SCP","Science of Computer Programming","j","B","软件工程/系统软件/程序设计语言"],["SoSyM","Software and Systems Modeling","j","B","软件工程/系统软件/程序设计语言"],["STVR","Software Testing, Verification and Reliability","j","B","软件工程/系统软件/程序设计语言"],["SPE","Software: Practice and Experience","j","B","软件工程/系统软件/程序设计语言"],["CL","Computer Languages, Systems and Structures","j","C","软件工程/系统软件/程序设计语言"],["IJSEKE","International Journal of Software Engineering and Knowledge Engineering","j","C","软件工程/系统软件/程序设计语言"],["STTT","International Journal of Software Tools for Technology Transfer","j","C","软件工程/系统软件/程序设计语言"],["JLAMP","Journal of Logical and Algebraic Methods in Programming","j","C","软件工程/系统软件/程序设计语言"],["JWE","Journal of Web Engineering","j","C","软件工程/系统软件/程序设计语言"],["SOCA","Service Oriented Computing and Applications","j","C","软件工程/系统软件/程序设计语言"],["SQJ","Software Quality Journal","j","C","软件工程/系统软件/程序设计语言"],["TPLP","Theory and Practice of Logic Programming","j","C","软件工程/系统软件/程序设计语言"],["PACMPL","Proceedings of the ACM on Programming Languages","j","C","软件工程/系统软件/程序设计语言"],["PLDI","ACMSIGPLANConference on Programming Language Design and Implementation","c","A","软件工程/系统软件/程序设计语言"],["POPL","ACMSIGPLAN-SIGACTSymposium on Principles of Programming Languages","c","A","软件工程/系统软件/程序设计语言"],["FSE","ACM International Conference on the Foundations of Software Engineering","c","A","软件工程/系统软件/程序设计语言"],["SOSP","ACM Symposium on Operating Systems Principles","c","A","软件工程/系统软件/程序设计语言"],["OOPSLA","Conference on Object-Oriented Programming Systems, Languages, and Applications","c","A","软件工程/系统软件/程序设计语言"],["ASE","International Conference on Automated Software Engineering","c","A","软件工程/系统软件/程序设计语言"],["ICSE","International Conference on Software Engineering","c","A","软件工程/系统软件/程序设计语言"],["ISSTA","International Symposium on Software Testing and Analysis","c","A","软件工程/系统软件/程序设计语言"],["OSDI","USENIX Symposium on Operating Systems Design and Implementation","c","A","软件工程/系统软件/程序设计语言"],["FM","International Symposium on Formal Methods","c","A","软件工程/系统软件/程序设计语言"],["ECOOP","European Conference on Object-Oriented Programming","c","B","软件工程/系统软件/程序设计语言"],["ETAPS","European Joint Conferences on Theory and Practice of Software","c","B","软件工程/系统软件/程序设计语言"],["ICPC","IEEE International Conference on Program Comprehension","c","B","软件工程/系统软件/程序设计语言"],["RE","IEEE International Requirements Engineering Conference","c","B","软件工程/系统软件/程序设计语言"],["CAiSE","International Conference on Advanced Information Systems Engineering","c","B","软件工程/系统软件/程序设计语言"],["ICFP","ACMSIGPLANInternational Conference on Function Programming","c","B","软件工程/系统软件/程序设计语言"],["LCTES","ACMSIGPLAN/SIGBEDInternational Conference on Languages, Compilers and Tools for Embedded Systems","c","B","软件工程/系统软件/程序设计语言"],["MoDELS","ACM/IEEE International Conference on Model Driven Engineering Languages and Systems","c","B","软件工程/系统软件/程序设计语言"],["CP","International Conference on Principles and Practice of Constraint Programming","c","B","软件工程/系统软件/程序设计语言"],["ICSOC","International Conference on Service Oriented Computing","c","B","软件工程/系统软件/程序设计语言"],["SANER","IEEE International Conference on Software Analysis, Evolution, and Reengineering","c","B","软件工程/系统软件/程序设计语言"],["ICSME","International Conference on Software Maintenance and Evolution","c","B","软件工程/系统软件/程序设计语言"],["VMCAI","International Conference on Verification, Model Checking and Abstract Interpretation","c","B","软件工程/系统软件/程序设计语言"],["ICWS","IEEE International Conference on Web Services","c","B","软件工程/系统软件/程序设计语言"],["Middleware","International Middleware Conference","c","B","软件工程/系统软件/程序设计语言"],["SAS","International Static Analysis Symposium","c","B","软件工程/系统软件/程序设计语言"],["ESEM","International Symposium on Empirical Software Engineering and Measurement","c","B","软件工程/系统软件/程序设计语言"],["ISSRE","IEEE International Symposium on Software Reliability Engineering","c","B","软件工程/系统软件/程序设计语言"],["HotOS","USENIX Workshop on Hot Topics in Operating Systems","c","B","软件工程/系统软件/程序设计语言"],["CC","International Conference on Compiler Construction","c","B","软件工程/系统软件/程序设计语言"],["PEPM","ACMSIGPLANWorkshop on Partial Evaluation and Program Manipulation","c","C","软件工程/系统软件/程序设计语言"],["PASTE","ACMSIGPLAN-SIGSOFTWorkshop on Program Analysis for Software Tools and Engineering","c","C","软件工程/系统软件/程序设计语言"],["APLAS","Asian Symposium on Programming Languages and Systems","c","C","软件工程/系统软件/程序设计语言"],["APSEC","Asia-Pacific Software Engineering Conference","c","C","软件工程/系统软件/程序设计语言"],["EASE","International Conference on Evaluation and Assessment in Software Engineering","c","C","软件工程/系统软件/程序设计语言"],["ICECCS","International Conference on Engineering of Complex Computer Systems","c","C","软件工程/系统软件/程序设计语言"],["ICST","IEEE International Conference on Software Testing, Verification and Validation","c","C","软件工程/系统软件/程序设计语言"],["ISPASS","IEEE International Symposium on Performance Analysis of Systems and Software","c","C","软件工程/系统软件/程序设计语言"],["SCAM","IEEE International Working Conference on Source Code Analysis and Manipulation","c","C","软件工程/系统软件/程序设计语言"],["COMPSAC","International Computer Software and Applications Conference","c","C","软件工程/系统软件/程序设计语言"],["ICFEM","International Conference on Formal Engineering Methods","c","C","软件工程/系统软件/程序设计语言"],["SSE","IEEE International Conference on Software Services Engineering","c","C","软件工程/系统软件/程序设计语言"],["ICSSP","International Conference on Software and System Process","c","C","软件工程/系统软件/程序设计语言"],["SEKE","International Conference on Software Engineering and Knowledge Engineering","c","C","软件工程/系统软件/程序设计语言"],["QRS","International Conference on Software Quality, Reliability and Security","c","C","软件工程/系统软件/程序设计语言"],["ICSR","International Conference on Software Reuse","c","C","软件工程/系统软件/程序设计语言"],["ICWE","International Conference on Web Engineering","c","C","软件工程/系统软件/程序设计语言"],["SPIN","International Symposium on Model Checking of Software","c","C","软件工程/系统软件/程序设计语言"],["ATVA","International Symposium on Automated Technology for Verification and Analysis","c","C","软件工程/系统软件/程序设计语言"],["LOPSTR","International Symposium on Logic-based Program Synthesis and Transformation","c","C","软件工程/系统软件/程序设计语言"],["TASE","Theoretical Aspects of Software Engineering Conference","c","C","软件工程/系统软件/程序设计语言"],["MSR","Mining Software Repositories","c","C","软件工程/系统软件/程序设计语言"],["REFSQ","Requirements Engineering: Foundation for Software Quality","c","C","软件工程/系统软件/程序设计语言"],["WICSA","Working IEEE/IFIP Conference on Software Architecture","c","C","软件工程/系统软件/程序设计语言"],["Internetware","Asia-Pacific Symposium on Internetware","c","C","软件工程/系统软件/程序设计语言"],["RV","International Conference on Runtime Verification","c","C","软件工程/系统软件/程序设计语言"],["MEMOCODE","International Conference on Formal Methods and Models for Co-Design","c","C","软件工程/系统软件/程序设计语言"],["TODS","ACM Transactions on Database Systems","j","A","软件工程/系统软件/程序设计语言"],["TOIS","ACM Transactions on Information Systems","j","A","软件工程/系统软件/程序设计语言"],["TKDE","IEEE Transactions on Knowledge and Data Engineering","j","A","软件工程/系统软件/程序设计语言"],["VLDBJ","The VLDBJournal","j","A","软件工程/系统软件/程序设计语言"],["TKDD","ACM Transactions on Knowledge Discoveryfrom Data","j","B","软件工程/系统软件/程序设计语言"],["TWEB","ACM Transactions on the Web","j","B","软件工程/系统软件/程序设计语言"],["AEI","Advanced Engineering Informatics","j","B","软件工程/系统软件/程序设计语言"],["DKE","Data & Knowledge Engineering","j","B","软件工程/系统软件/程序设计语言"],["DMKD","Data Mining and Knowledge Discovery","j","B","软件工程/系统软件/程序设计语言"],["EJIS","European Journal of Information Systems","j","B","软件工程/系统软件/程序设计语言"],["","Geo Informatica","j","B","软件工程/系统软件/程序设计语言"],["IPM","Information Processing and Management","j","B","软件工程/系统软件/程序设计语言"],["","Information Sciences","j","B","软件工程/系统软件/程序设计语言"],["IS","Information Systems","j","B","软件工程/系统软件/程序设计语言"],["JASIST","Journal of the Association for Information Science and Technology","j","B","软件工程/系统软件/程序设计语言"],["JWS","Journal of Web Semantics","j","B","软件工程/系统软件/程序设计语言"],["KAIS","Knowledge and Information Systems","j","B","软件工程/系统软件/程序设计语言"],["DSE","Data Science and Engineering","j","B","软件工程/系统软件/程序设计语言"],["DPD","Distributed and Parallel Databases","j","C","软件工程/系统软件/程序设计语言"],["I&M","Information & Management","j","C","软件工程/系统软件/程序设计语言"],["IPL","Information Processing Letters","j","C","软件工程/系统软件/程序设计语言"],["（原IR）","Discover Computing （原Information Retrieval Journal）","j","C","软件工程/系统软件/程序设计语言"],["IJCIS","International Journal of Cooperative Information Systems","j","C","软件工程/系统软件/程序设计语言"],["IJGIS","International Journal of Geographical Information Science","j","C","软件工程/系统软件/程序设计语言"],["IJIS","International Journal of Intelligent Systems","j","C","软件工程/系统软件/程序设计语言"],["IJKM","International Journal of Knowledge Management","j","C","软件工程/系统软件/程序设计语言"],["IJSWIS","International Journal on Semantic Web and Information Systems","j","C","软件工程/系统软件/程序设计语言"],["JCIS","Journal of Computer Information Systems","j","C","软件工程/系统软件/程序设计语言"],["JDM","Journal of Database Management","j","C","软件工程/系统软件/程序设计语言"],["JGITM","Journal of Global Information Technology Management","j","C","软件工程/系统软件/程序设计语言"],["JIIS","Journal of Intelligent Information Systems","j","C","软件工程/系统软件/程序设计语言"],["JSIS","The Journal of Strategic Information Systems","j","C","软件工程/系统软件/程序设计语言"],["TIST","ACM Transactions on Intelligent Systems and Technology","j","C","软件工程/系统软件/程序设计语言"],["TORS","ACM Transactions on Recommender Systems","j","C","软件工程/系统软件/程序设计语言"],["SIGMOD","ACMSIGMODConference","c","A","数据库/数据挖掘/内容检索"],["SIGKDD","ACMSIGKDDConference on Knowledge Discovery and Data Mining","c","A","数据库/数据挖掘/内容检索"],["ICDE","IEEE International Conference on Data Engineering","c","A","数据库/数据挖掘/内容检索"],["SIGIR","International ACMSIGIRConference on Research and Development in Information Retrieval","c","A","数据库/数据挖掘/内容检索"],["VLDB","International Conference on Very Large Data Bases","c","A","数据库/数据挖掘/内容检索"],["CIKM","ACM International Conference on Information and Knowledge Management","c","B","数据库/数据挖掘/内容检索"],["WSDM","ACM International Conference on Web Search and Data Mining","c","B","数据库/数据挖掘/内容检索"],["PODS","ACMSIGMOD-SIGACT-SIGAISymposium on Principles of Database Systems","c","B","数据库/数据挖掘/内容检索"],["DASFAA","International Conference on Database Systems for Advanced Applications","c","B","数据库/数据挖掘/内容检索"],["ECML-PKDD","European Conference on Machine Learning and Principles and Practice of Knowledge Discovery in Databases","c","B","数据库/数据挖掘/内容检索"],["ISWC","IEEE International Semantic Web Conference","c","B","数据库/数据挖掘/内容检索"],["ICDM","IEEE International Conference on Data Mining","c","B","数据库/数据挖掘/内容检索"],["ICDT","International Conference on Database Theory","c","B","数据库/数据挖掘/内容检索"],["EDBT","International Conference on Extending Database Technology","c","B","数据库/数据挖掘/内容检索"],["CIDR","Conference on Innovative Data Systems Research","c","B","数据库/数据挖掘/内容检索"],["SDM","SIAMInternational Conference on Data Mining","c","B","数据库/数据挖掘/内容检索"],["RecSys","ACM Conference on Recommender Systems","c","B","数据库/数据挖掘/内容检索"],["WISE","Web Information Systems Engineering Conference","c","B","数据库/数据挖掘/内容检索"],["APWeb","Asia Pacific Web Conference","c","C","数据库/数据挖掘/内容检索"],["DEXA","International Conference on Database and Expert System Applications","c","C","数据库/数据挖掘/内容检索"],["ECIR","European Conference on Information Retrieval","c","C","数据库/数据挖掘/内容检索"],["ESWC","Extended Semantic Web Conference","c","C","数据库/数据挖掘/内容检索"],["WebDB","International Workshop on Web and Databases","c","C","数据库/数据挖掘/内容检索"],["ER","International Conference on Conceptual Modeling","c","C","数据库/数据挖掘/内容检索"],["MDM","International Conference on Mobile Data Management","c","C","数据库/数据挖掘/内容检索"],["SSDBM","International Conference on Scientific and Statistical Database Management","c","C","数据库/数据挖掘/内容检索"],["WAIM","International Conference on Web Age Information Management","c","C","数据库/数据挖掘/内容检索"],["SSTD","International Symposium on Spatial and Temporal Databases","c","C","数据库/数据挖掘/内容检索"],["PAKDD","Pacific-Asia Conference on Knowledge Discovery and Data Mining","c","C","数据库/数据挖掘/内容检索"],["ADMA","International Conference on Advanced Data Mining and Applications","c","C","数据库/数据挖掘/内容检索"],["WISA","Web Information Systems and Applications","c","C","数据库/数据挖掘/内容检索"],["TIT","IEEE Transactions on Information Theory","j","A","计算机科学理论"],["IANDC","Information and Computation","j","A","计算机科学理论"],["SICOMP","SIAMJournal on Computing","j","A","计算机科学理论"],["TALG","ACM Transactions on Algorithms","j","B","计算机科学理论"],["TOCL","ACM Transactions on Computational Logic","j","B","计算机科学理论"],["TOMS","ACM Transactions on Mathematical Software","j","B","计算机科学理论"],["Algorithmica","Algorithmica","j","B","计算机科学理论"],["CC","Computational Complexity","j","B","计算机科学理论"],["FAC","Formal Aspects of Computing","j","B","计算机科学理论"],["FMSD","Formal Methods in System Design","j","B","计算机科学理论"],["INFORMS","INFORMSJournal on Computing","j","B","计算机科学理论"],["JCSS","Journal of Computer and System Sciences","j","B","计算机科学理论"],["JGO","Journal of Global Optimization","j","B","计算机科学理论"],["JSC","Journal of Symbolic Computation","j","B","计算机科学理论"],["MSCS","Mathematical Structures in Computer Science","j","B","计算机科学理论"],["TCS","Theoretical Computer Science","j","B","计算机科学理论"],["ACTA","Acta Informatica","j","C","计算机科学理论"],["APAL","Annals of Pure and Applied Logic","j","C","计算机科学理论"],["DAM","Discrete Applied Mathematics","j","C","计算机科学理论"],["FUIN","Fundamenta Informaticae","j","C","计算机科学理论"],["IPL","Information Processing Letters","j","C","计算机科学理论"],["JCOMPLEXI TY","Journal of Complexity","j","C","计算机科学理论"],["LOGCOM","Journal of Logic and Computation","j","C","计算机科学理论"],["JSL","The Journal of Symbolic Logic","j","C","计算机科学理论"],["LMCS","Logical Methods in Computer Science","j","C","计算机科学理论"],["SIDMA","SIAMJournal on Discrete Mathematics","j","C","计算机科学理论"],["","Theory of Computing Systems","j","C","计算机科学理论"],["TQC","ACM Transactions in Quantum Computing","j","C","计算机科学理论"],["STOC","ACM Symposium on the Theory of Computing","c","A","计算机科学理论"],["SODA","ACM-SIAMSymposium on Discrete Algorithms","c","A","计算机科学理论"],["CAV","International Conference on Computer Aided Verification","c","A","计算机科学理论"],["FOCS","IEEE Annual Symposium on Foundations of Computer Science","c","A","计算机科学理论"],["LICS","ACM/IEEE Symposium on Logic in Computer Science","c","A","计算机科学理论"],["SoCG","International Symposium on Computational Geometry","c","B","计算机科学理论"],["ESA","European Symposium on Algorithms","c","B","计算机科学理论"],["CCC","Conference on Computational Complexity","c","B","计算机科学理论"],["ICALP","International Colloquium on Automata, Languages and Programming","c","B","计算机科学理论"],["CADE","Conference on Automated Deduction","c","B","计算机科学理论"],["CONCUR","International Conference on Concurrency Theory","c","B","计算机科学理论"],["HSCC","International Conference on Hybrid Systems: Computation and Control","c","B","计算机科学理论"],["SAT","International Conference on Theory and Applications of Satisfiability Testing","c","B","计算机科学理论"],["COCOON","International Computing and Combinatorics Conference","c","B","计算机科学理论"],["FMCAD","Formal Methods in Computer-Aided Design","c","B","计算机科学理论"],["CSL","Computer Science Logic","c","C","计算机科学理论"],["FSTTCS","Foundations of Software Technology and Theoretical Computer Science","c","C","计算机科学理论"],["DSAA","IEEE International Conference on Data Science and Advanced Analytics","c","C","计算机科学理论"],["ICTAC","International Colloquium on Theoretical Aspects of Computing","c","C","计算机科学理论"],["IPCO","International Conference on Integer Programming and Combinatorial Optimization","c","C","计算机科学理论"],["FSCD （原RTA）","International Conference on Formal Structures for Computation and Deduction","c","C","计算机科学理论"],["ISAAC","International Symposium on Algorithms and Computation","c","C","计算机科学理论"],["MFCS","International Conference on Mathematical Foundations of Computer Science","c","C","计算机科学理论"],["STACS","Symposium on Theoretical Aspects of Computer Science","c","C","计算机科学理论"],["SETTA","International Symposium on Software Engineering: Theories, Tools, and Applications","c","C","计算机科学理论"],["TOG","ACM Transactions on Graphics","j","A","计算机图形学与多媒体"],["TIP","IEEE Transactions on Image Processing","j","A","计算机图形学与多媒体"],["TVCG","IEEE Transactions on Visualization and Computer Graphics","j","A","计算机图形学与多媒体"],["TMM","IEEE Transactions on Multimedia","j","A","计算机图形学与多媒体"],["TOMM","ACM Transactions on Multimedia Computing, Communications and Applications","j","B","计算机图形学与多媒体"],["CAGD","Computer Aided Geometric Design","j","B","计算机图形学与多媒体"],["CGF","Computer Graphics Forum","j","B","计算机图形学与多媒体"],["CAD","Computer-Aided Design","j","B","计算机图形学与多媒体"],["TCSVT","IEEE Transactions on Circuits and Systems for Video Technology","j","B","计算机图形学与多媒体"],["JASA","The Journal of the Acoustical Society of America","j","B","计算机图形学与多媒体"],["SIIMS","SIAMJournal on Imaging Sciences","j","B","计算机图形学与多媒体"],["SPECOM","Speech Communication","j","B","计算机图形学与多媒体"],["CVMJ","Computational Visual Media","j","B","计算机图形学与多媒体"],["CGTA","Computational Geometry: Theory and Applications","j","C","计算机图形学与多媒体"],["CAVW","Computeranimation & virtualworlds","j","C","计算机图形学与多媒体"],["C&G","Computers & Graphics","j","C","计算机图形学与多媒体"],["DCG","Discrete & Computational Geometry","j","C","计算机图形学与多媒体"],["SPL","IEEE Signal Processing Letters","j","C","计算机图形学与多媒体"],["IET-IPR","IET Image Processing","j","C","计算机图形学与多媒体"],["JVCIR","Journal of Visual Communication and Image Representation","j","C","计算机图形学与多媒体"],["MS","Multimedia Systems","j","C","计算机图形学与多媒体"],["MTA","Multimedia Tools and Applications","j","C","计算机图形学与多媒体"],["SIGPRO","Signal Processing","j","C","计算机图形学与多媒体"],["IMAGE","Signal Processing: Image Communication","j","C","计算机图形学与多媒体"],["TVC","The Visual Computer","j","C","计算机图形学与多媒体"],["VI","Visual Informatics","j","C","计算机图形学与多媒体"],["VRIH","Virtual Reality & Intelligent Hardware","j","C","计算机图形学与多媒体"],["GMOD","Graphical Models","j","C","计算机图形学与多媒体"],["ACMMM","ACM International Conference on Multimedia","c","A","计算机图形学与多媒体"],["SIGGRAPH","ACM Special Interest Groupon Computer Graphics","c","A","计算机图形学与多媒体"],["VR","IEEE Conference on Virtual Realityand3 DUser Interfaces （原IEEE Virtual Reality）","c","A","计算机图形学与多媒体"],["IEEEVIS","IEEE Visualization Conference","c","A","计算机图形学与多媒体"],["ICMR","ACMSIGMMInternational Conference on Multimedia Retrieval","c","B","计算机图形学与多媒体"],["I3D","ACMSIGGRAPHSymposium on Interactive3 DGraphics and Games","c","B","计算机图形学与多媒体"],["SCA","ACMSIGGRAPH/Eurographics Symposium on Computer Animation","c","B","计算机图形学与多媒体"],["DCC","Data Compression Conference","c","B","计算机图形学与多媒体"],["Eurographics","Annual Conferenceof the European Association for Computer Graphics","c","B","计算机图形学与多媒体"],["EuroVis","Eurographics Conference on Visualization","c","B","计算机图形学与多媒体"],["SGP","Eurographics Symposium on Geometry Processing","c","B","计算机图形学与多媒体"],["EGSR","Eurographics Symposium on Rendering","c","B","计算机图形学与多媒体"],["ICASSP","IEEE International Conference on Acoustics, Speech and Signal Processing","c","B","计算机图形学与多媒体"],["ICME","IEEE International Conference on Multimedia & Expo","c","B","计算机图形学与多媒体"],["ISMAR","International Symposium on Mixed and Augmented Reality","c","B","计算机图形学与多媒体"],["PG","Pacific Conference on Computer Graphics and Applications","c","B","计算机图形学与多媒体"],["SPM","Symposium on Solid and Physical Modeling","c","B","计算机图形学与多媒体"],["INTER- SPEECH","Conferenceof the International Speech Communication Association","c","B","计算机图形学与多媒体"],["VRST","ACM Symposium on Virtual Reality Software and Technology","c","C","计算机图形学与多媒体"],["CASAXR （原CASA）","International Conference on Computer Animation, Social Agents, and Extended Reality （原International Conference on Computer Animation and Social Agents）","c","C","计算机图形学与多媒体"],["CGI","Computer Graphics International","c","C","计算机图形学与多媒体"],["GMP","Geometric Modeling and Processing","c","C","计算机图形学与多媒体"],["PacificVis","IEEE Pacific Visualization Symposium","c","C","计算机图形学与多媒体"],["3DV","International Conferenceon3 DVision","c","C","计算机图形学与多媒体"],["CAD/Graphics","International Conference on Computer-Aided Design and Computer Graphics Processing","c","C","计算机图形学与多媒体"],["ICIP","IEEE International Conference on Image Processing","c","C","计算机图形学与多媒体"],["MMM","International Conference on Multimedia Modeling","c","C","计算机图形学与多媒体"],["MMAsia","ACM Multimedia Asia","c","C","计算机图形学与多媒体"],["SMI","Shape Modeling International","c","C","计算机图形学与多媒体"],["CVM","Computational Visual Media","c","C","计算机图形学与多媒体"],["PRCV","Chinese Conference on Pattern Recognition and Computer Vision","c","C","计算机图形学与多媒体"],["ICIG","International Conference on Image and Graphics","c","C","计算机图形学与多媒体"],["NCMMSC","National Conference on Man-Machine Speech Communication","c","C","计算机图形学与多媒体"],["ASRU","Automatic Speech Recognition and Understanding Workshop","c","C","计算机图形学与多媒体"],["SLT","Spoken Language Technology","c","C","计算机图形学与多媒体"],["AI","Artificial Intelligence","j","A","人工智能"],["TPAMI","IEEE Transactions on Pattern Analysis and Machine Intelligence","j","A","人工智能"],["IJCV","International Journal of Computer Vision","j","A","人工智能"],["JMLR","Journal of Machine Learning Research","j","A","人工智能"],["TAP","ACM Transactions on Applied Perception","j","B","人工智能"],["AAMAS","Autonomous Agents and Multi-Agent Systems","j","B","人工智能"],["","Computational Linguistics","j","B","人工智能"],["CVIU","Computer Vision and Image Understanding","j","B","人工智能"],["DKE","Data & Knowledge Engineering","j","B","人工智能"],["","Evolutionary Computation","j","B","人工智能"],["TAC","IEEE Transactions on Affective Computing","j","B","人工智能"],["TASLP","IEEE Transactions on Audio, Speech and Language Processing （原IEEE/ACM Transactions on Audio, Speech and Language Processing）","j","B","人工智能"],["","IEEE Transactions on Cybernetics","j","B","人工智能"],["TEC","IEEE Transactions on Evolutionary Computation","j","B","人工智能"],["TFS","IEEE Transactions on Fuzzy Systems","j","B","人工智能"],["TNNLS","IEEE Transactions on Neural Networksandlearning systems","j","B","人工智能"],["IJAR","International Journal of Approximate Reasoning","j","B","人工智能"],["JAIR","Journal of Artificial Intelligence Research","j","B","人工智能"],["","Journal of Automated Reasoning","j","B","人工智能"],["JSLHR","Journal of Speech, Language, and Hearing Research","j","B","人工智能"],["","Machine Learning","j","B","人工智能"],["","Neural Computation","j","B","人工智能"],["","Neural Networks","j","B","人工智能"],["PR","Pattern Recognition","j","B","人工智能"],["TACL","Transactionsof the Association for Computational Linguistics","j","B","人工智能"],["TALLIP","ACM Transactions on Asian and Low-Resource Language Information Processing","j","C","人工智能"],["","Applied Intelligence","j","C","人工智能"],["AIM","Artificial Intelligence in Medicine","j","C","人工智能"],["","Artificial Life","j","C","人工智能"],["","Computational Intelligence","j","C","人工智能"],["","Computer Speech & Language","j","C","人工智能"],["","Connection Science","j","C","人工智能"],["DSS","Decision Support Systems","j","C","人工智能"],["EAAI","Engineering Applications of Artificial Intelligence","j","C","人工智能"],["","Expert Systems","j","C","人工智能"],["ESWA","Expert Systems with Applications","j","C","人工智能"],["","Fuzzy Sets and Systems","j","C","人工智能"],["TG","IEEE Transactions on Games","j","C","人工智能"],["IET-CVI","IET Computer Vision","j","C","人工智能"],["","IET Signal Processing","j","C","人工智能"],["IVC","Image and Vision Computing","j","C","人工智能"],["IDA","Intelligent Data Analysis","j","C","人工智能"],["IJCIA","International Journal of Computational Intelligence and Applications","j","C","人工智能"],["IJIS","International Journal of Intelligent Systems","j","C","人工智能"],["IJNS","International Journal of Neural Systems","j","C","人工智能"],["IJPRAI","International Journal of Pattern Recognition and Artificial Intelligence","j","C","人工智能"],["IJUFKS","International Journal of Uncertainty, Fuzziness and Knowledge-Based Systems","j","C","人工智能"],["IJDAR","International Journal on Document Analysis and Recognition","j","C","人工智能"],["JETAI","Journal of Experimental and Theoretical Artificial Intelligence","j","C","人工智能"],["KBS","Knowledge-Based Systems","j","C","人工智能"],["","Machine Translation","j","C","人工智能"],["","Machine Vision and Applications","j","C","人工智能"],["","Natural Computing","j","C","人工智能"],["NLE","Natural Language Engineering","j","C","人工智能"],["NCA","Neural Computing and Applications","j","C","人工智能"],["NPL","Neural Processing Letters","j","C","人工智能"],["","Neurocomputing","j","C","人工智能"],["PAA","Pattern Analysis and Applications","j","C","人工智能"],["PRL","Pattern Recognition Letters","j","C","人工智能"],["","Soft Computing","j","C","人工智能"],["WI","Web Intelligence","j","C","人工智能"],["TIIS","ACM Transactions on Interactive Intelligent Systems","j","C","人工智能"],["TELO","ACM Transactions on Evolutionary Learning and Optimization","j","C","人工智能"],["JATS","ACM Journal on Autonomous Transportation Systems","j","C","人工智能"],["AAAI","AAAIConference on Artificial Intelligence","c","A","人工智能"],["NeurIPS","Conference on Neural Information Processing Systems","c","A","人工智能"],["ACL","Annual Meetingof the Association for Computational Linguistics","c","A","人工智能"],["CVPR","IEEE/CVFComputer Vision and Pattern Recognition Conference","c","A","人工智能"],["ICCV","International Conference on Computer Vision","c","A","人工智能"],["ICML","International Conference on Machine Learning","c","A","人工智能"],["ICLR","International Conference on Learning Representations","c","A","人工智能"],["COLT","Annual Conference on Computational Learning Theory","c","B","人工智能"],["EMNLP","Conference on Empirical Methods in Natural Language Processing","c","B","人工智能"],["ECAI","European Conference on Artificial Intelligence","c","B","人工智能"],["ECCV","European Conference on Computer Vision","c","B","人工智能"],["ICRA","IEEE International Conference on Robotics and Automation","c","B","人工智能"],["ICAPS","International Conference on Automated Planning and Scheduling","c","B","人工智能"],["ICCBR","International Conference on Case-Based Reasoning","c","B","人工智能"],["COLING","International Conference on Computational Linguistics","c","B","人工智能"],["KR","International Conference on Principles of Knowledge Representation and Reasoning","c","B","人工智能"],["UAI","Conference on Uncertainty in Artificial Intelligence","c","B","人工智能"],["AAMAS","International Joint Conference on Autonomous Agents and Multi-agent Systems","c","B","人工智能"],["PPSN","Parallel Problem Solvingfrom Nature","c","B","人工智能"],["NAACL","North American Chapterof the Association for Computational Linguistics","c","B","人工智能"],["IJCAI","International Joint Conference on Artificial Intelligence","c","B","人工智能"],["AISTATS","International Conference on Artificial Intelligence and Statistics","c","C","人工智能"],["ACCV","Asian Conference on Computer Vision","c","C","人工智能"],["ACML","Asian Conference on Machine Learning","c","C","人工智能"],["BMVC","British Machine Vision Conference","c","C","人工智能"],["NLPCC","CCFInternational Conference on Natural Language Processing and Chinese Computing","c","C","人工智能"],["CoNLL","Conference on Computational Natural Language Learning","c","C","人工智能"],["GECCO","Genetic and Evolutionary Computation Conference","c","C","人工智能"],["ICTAI","IEEE International Conference on Tools with Artificial Intelligence","c","C","人工智能"],["IROS","IEEE\\RSJInternational Conference on Intelligent Robots and Systems","c","C","人工智能"],["ALT","International Conference on Algorithmic Learning Theory","c","C","人工智能"],["ICANN","International Conference on Artificial Neural Networks","c","C","人工智能"],["FG","IEEE International Conference on Automatic Face and Gesture Recognition","c","C","人工智能"],["ICDAR","International Conference on Document Analysis and Recognition","c","C","人工智能"],["ILP","International Conference on Inductive Logic Programming","c","C","人工智能"],["KSEM","Internationalconferenceon Knowledge Science, Engineering and Management","c","C","人工智能"],["ICONIP","International Conference on Neural Information Processing","c","C","人工智能"],["ICPR","International Conference on Pattern Recognition","c","C","人工智能"],["IJCB","International Joint Conference on Biometrics","c","C","人工智能"],["IJCNN","International Joint Conference on Neural Networks","c","C","人工智能"],["PRICAI","Pacific Rim International Conference on Artificial Intelligence","c","C","人工智能"],["IEEECEC","Congresson Evolutionary Computation","c","C","人工智能"],["DAI","International Conference on Distributed Artificial Intelligence","c","C","人工智能"],["TOCHI","ACM Transactions on Computer-Human Interaction","j","A","人机交互与普适计算"],["IJHCS","International Journal of Human-Computer Studies","j","A","人机交互与普适计算"],["CSCW","Computer Supported Cooperative Work","j","B","人机交互与普适计算"],["HCI","Human-Computer Interaction","j","B","人机交互与普适计算"],["","IEEE Transactions on Human-Machine Systems","j","B","人机交互与普适计算"],["IWC","Interacting with Computers","j","B","人机交互与普适计算"],["IJHCI","International Journal of Human-Computer Interaction","j","B","人机交互与普适计算"],["UMUAI","User Modeling and User-Adapted Interaction","j","B","人机交互与普适计算"],["TSMC","IEEE Transactions on Systems, Man, and Cybernetics: Systems","j","B","人机交互与普适计算"],["CCFTPCI","CCFTransactions on Pervasive Computing and Interaction","j","B","人机交互与普适计算"],["BIT","Behaviour & Information Technology","j","C","人机交互与普适计算"],["PUC","Personal and Ubiquitous Computing","j","C","人机交互与普适计算"],["PMC","Pervasive and Mobile Computing","j","C","人机交互与普适计算"],["PACMHCI","Proceedings of the ACM on Human-Computer Interaction","j","C","人机交互与普适计算"],["THRI","ACM Transactions on Human-Robot Interaction","j","C","人机交互与普适计算"],["CSCW","ACM Conference On Computer-Supported Cooperative Work And Social Computing","c","A","人机交互与普适计算"],["CHI","ACM Conference on Human Factors in Computing Systems","c","A","人机交互与普适计算"],["UbiComp","ACMinternationaljointconferenceon Pervasive and Ubiquitous Computing","c","A","人机交互与普适计算"],["UIST","ACM Symposium on User Interface Software and Technology","c","A","人机交互与普适计算"],["GROUP","ACM International Conference on Supporting Group Work","c","B","人机交互与普适计算"],["IUI","ACM International Conference on Intelligent User Interfaces","c","B","人机交互与普适计算"],["ISS","ACM International Conference on Interactive Surfaces and Spaces","c","B","人机交互与普适计算"],["ECSCW","European Conference on Computer Supported Cooperative Work","c","B","人机交互与普适计算"],["PERCOM","IEEE International Conference on Pervasive Computing and Communications","c","B","人机交互与普适计算"],["MobileHCI","ACM International Conference on Mobile Human- Computer Interaction","c","B","人机交互与普适计算"],["ICWSM","The International AAAIConference on Web and Social Media","c","B","人机交互与普适计算"],["DIS","ACMSIGCHIConference on Designing Interactive Systems","c","C","人机交互与普适计算"],["ICMI","ACM International Conference on Multimodal Interaction","c","C","人机交互与普适计算"],["ASSETS","International ACMSIGACCESSConference on Computers and Accessibility","c","C","人机交互与普适计算"],["GI","Graphics Interface","c","C","人机交互与普适计算"],["UIC","IEEE International Conference on Ubiquitous Intelligence and Computing","c","C","人机交互与普适计算"],["","IEEE World Haptics Conference","c","C","人机交互与普适计算"],["INTERACT","International Conference on Human-Computer Interaction of International Federation for Information Processing","c","C","人机交互与普适计算"],["IDC","ACM Interaction Design and Children","c","C","人机交互与普适计算"],["CollaborateCom","International Conference on Collaborative Computing: Networking, Applications and Worksharing","c","C","人机交互与普适计算"],["CSCWD","International Conference on Computer Supported Cooperative Work in Design","c","C","人机交互与普适计算"],["CoopIS","International Conference on Cooperative Information Systems","c","C","人机交互与普适计算"],["MobiQuitous","International Conference on Mobile and Ubiquitous Systems: Computing, Networking and Services","c","C","人机交互与普适计算"],["AVI","International Working Conference on Advanced Visual Interfaces","c","C","人机交互与普适计算"],["GPC","Conference on Green, Pervasive and Cloud Computing","c","C","人机交互与普适计算"],["ICXR","CCFInternational Conference on Extended Reality","c","C","人机交互与普适计算"],["JACM","Journal of the ACM","j","A","交叉/综合/新兴"],["Proc.IEEE","Proceedings of the IEEE","j","A","交叉/综合/新兴"],["SCIS","Science China Information Sciences","j","A","交叉/综合/新兴"],["Bioinformatics","Bioinformatics","j","A","交叉/综合/新兴"],["","Briefings in Bioinformatics","j","B","交叉/综合/新兴"],["Cognition","Cognition","j","B","交叉/综合/新兴"],["TASAE","IEEE Transactions on Automation Science and Engineering","j","B","交叉/综合/新兴"],["TGARS","IEEE Transactions on Geoscience and Remote Sensing","j","B","交叉/综合/新兴"],["TITS","IEEE Transactions on Intelligent Transportation Systems","j","B","交叉/综合/新兴"],["TMI","IEEE Transactions on Medical Imaging","j","B","交叉/综合/新兴"],["TR","IEEE Transactions on Robotics","j","B","交叉/综合/新兴"],["TCBB","IEEE/ACM Transactions on Computational Biology and Bioinformatics","j","B","交叉/综合/新兴"],["JCST","Journal of Computer Science and Technology","j","B","交叉/综合/新兴"],["JAMIA","Journal of the American Medical Informatics Association","j","B","交叉/综合/新兴"],["","PLOSComputational Biology","j","B","交叉/综合/新兴"],["","The Computer Journal","j","B","交叉/综合/新兴"],["WWW","World Wide Web","j","B","交叉/综合/新兴"],["FCS","Frontiers of Computer Science","j","B","交叉/综合/新兴"],["BCRA","Blockchain: Research and Applications","j","B","交叉/综合/新兴"],["","BMCBioinformatics","j","C","交叉/综合/新兴"],["","Cybernetics and Systems","j","C","交叉/综合/新兴"],["","IEEE Geoscience and Remote Sensing Letters","j","C","交叉/综合/新兴"],["JBHI","IEEE Journal of Biomedical and Health Informatics","j","C","交叉/综合/新兴"],["TBD","IEEE Transactions on Big Data","j","C","交叉/综合/新兴"],["","IET Intelligent Transport Systems","j","C","交叉/综合/新兴"],["JBI","Journal of Biomedical Informatics","j","C","交叉/综合/新兴"],["","Medical Image Analysis","j","C","交叉/综合/新兴"],["TII","IEEE Transactions on Industrial Informatics","j","C","交叉/综合/新兴"],["TCPS","ACM Transactions on Cyber-Physical Systems","j","C","交叉/综合/新兴"],["TOCE","ACM Transactions on Computing Education","j","C","交叉/综合/新兴"],["EITEE （原FITEE）","ENGINEERING Information Technology & Electronic Engineering （原Frontiers of Information Technology & Electronic Engineering）","j","C","交叉/综合/新兴"],["TCSS","IEEE Transactions on Computational Social Systems","j","C","交叉/综合/新兴"],["","IEEE Transactions on Reliability","j","C","交叉/综合/新兴"],["HEALTH","ACM Transactions on Computing for Healthcare","j","C","交叉/综合/新兴"],["ACMDLT","ACM Distributed Ledger Technologies: Research and Practice","j","C","交叉/综合/新兴"],["WWW","The Web Conference （原International World Wide Web Conference）","c","A","交叉/综合/新兴"],["RTSS","IEEE Real-Time Systems Symposium","c","A","交叉/综合/新兴"],["CogSci","Annual Meetingof the Cognitive Science Society","c","B","交叉/综合/新兴"],["BIBM","IEEE International Conference on Bioinformatics and Biomedicine","c","B","交叉/综合/新兴"],["EMSOFT","International Conference on Embedded Software","c","B","交叉/综合/新兴"],["ISMB","Internationalconferenceon Intelligent Systems for Molecular Biology","c","B","交叉/综合/新兴"],["RECOMB","Annual International Conference on Research in Computational Molecular Biology","c","B","交叉/综合/新兴"],["MICCAI","International Conference on Medical Image Computing and Computer-Assisted Intervention","c","B","交叉/综合/新兴"],["WINE","Conference on Web and Internet Economics","c","B","交叉/综合/新兴"],["AMIA","American Medical Informatics Association Annual Symposium","c","C","交叉/综合/新兴"],["APBC","Asia Pacific Bioinformatics Conference","c","C","交叉/综合/新兴"],["IEEEBigData","IEEE International Conference on Big Data","c","C","交叉/综合/新兴"],["IEEECLOUD","IEEE International Conference on Cloud Computing","c","C","交叉/综合/新兴"],["SMC","IEEE International Conference on Systems, Man, and Cybernetics","c","C","交叉/综合/新兴"],["COSIT","International Conference on Spatial Information Theory","c","C","交叉/综合/新兴"],["ISBRA","International Symposium on Bioinformatics Research and Applications","c","C","交叉/综合/新兴"],["SAGT","International Symposium on Algorithmic Game Theory","c","C","交叉/综合/新兴"],["SIGSPATIAL","ACM Special Interest Groupon Spatial Information","c","C","交叉/综合/新兴"],["ICIC","International Conference on Intelligent Computing","c","C","交叉/综合/新兴"],["ICSS","International Conference on Service Science","c","C","交叉/综合/新兴"],["AFT","Advances in Financial Technologies","c","C","交叉/综合/新兴"],["IJTCS-FAW","International Joint Conference on Theoretical Computer Science-Frontier of Algorithmic Wisdom","c","C","交叉/综合/新兴"]];

  /* ==================== 2. 匹配核心（纯函数，便于测试） ==================== */

  const TYPE_NAME = { j: '期刊', c: '会议' };
  const RANK_VAL = { A: 3, B: 2, C: 1 };

  // 归一化时丢弃的虚词 / 常见前缀词（目录名与网页文本两侧同时丢弃）
  const STOP = new Set(('the a an of on for and in at to with from by its proceedings proc annual international ieee acm')
    .split(' '));

  // 去掉词尾复数（两侧同做，用于容忍 Communication/Communications、System/Systems）
  function stem(t) {
    if (t.length > 3 && t.charCodeAt(t.length - 1) === 115 && t.charCodeAt(t.length - 2) !== 115) {
      return t.slice(0, -1);
    }
    return t;
  }

  // 把粘连的驼峰写法拆开：ACMSIGMODConference -> ACMSIGMOD Conference，VLDBJournal -> VLDB Journal
  function splitCamel(s) {
    return String(s)
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
  }

  // 归一化成 token 序列。目录名里有 ACMSIGPLAN 这种粘连写法，需要拆驼峰；
  // 网页文本是正常排版（且可能写成 "EXperiments"），不再拆，避免把词拆碎。
  function tokensOf(s, doSplit) {
    if (!s) return [];
    const base = doSplit ? splitCamel(s) : String(s);
    const words = base.match(/[A-Za-z0-9]+/g) || [];
    const out = [];
    for (let i = 0; i < words.length; i++) {
      let t = words[i].toLowerCase();
      if (STOP.has(t)) continue;
      if (/^\d+(?:st|nd|rd|th)?$/.test(t)) continue;
      t = t.replace(/acm/g, '').replace(/ieee/g, ''); // 目录里有 ACMSIGPLAN 这类粘连写法
      if (!t) continue;
      out.push(stem(t));
    }
    return out;
  }

  function letters(toks) {
    let n = 0;
    for (let i = 0; i < toks.length; i++) n += toks[i].length;
    return n;
  }

  const ENTRIES = CCF_RAW.map(function (r) {
    return { abbr: r[0], full: r[1], type: r[2], rank: r[3], cat: r[4] };
  });

  function cleanAbbr(a) {
    return String(a || '').replace(/[（(][^）)]*[）)]/g, '').trim();
  }

  const byAbbr = new Map();
  ENTRIES.forEach(function (e) {
    const k = cleanAbbr(e.abbr);
    if (!k) return;
    const old = byAbbr.get(k);
    if (!old || RANK_VAL[e.rank] > RANK_VAL[old.rank]) byAbbr.set(k, e);
  });

  /* --- 全称索引：按词序列“后缀对齐 + 覆盖率”匹配 --- */
  const ALIAS_FULL = {
    'USENIX ATC': 'ACMSIGOPSATC',
    'USENIX Annual Technical Conference': 'ACMSIGOPSATC',
    'Networked Systems Design and Implementation': 'NSDI',
    'Proceedings of the VLDB Endowment': 'VLDB',
    'Management of Data': 'SIGMOD',
    'Conference on Applications, Technologies, Architectures, and Protocols for Computer Communications': 'SIGCOMM',
    'IEEE Conference on Computer Communications': 'INFOCOM',
    'ACM SIGKDD International Conference on Knowledge Discovery and Data Mining': 'SIGKDD',
    'International World Wide Web Conference': 'WWW',
    'The Web Conference': 'WWW',
    'Advances in Neural Information Processing Systems': 'NeurIPS',
    'Conference on Empirical Methods in Natural Language Processing': 'EMNLP',
    'Annual Meeting of the Association for Computational Linguistics': 'ACL',
    'IEEE Conference on Computer Vision and Pattern Recognition': 'CVPR',
    'European Conference on Computer Vision': 'ECCV'
  };

  const patMap = new Map(); // 字母串 -> { toks, e }
  let fullIndex = [];
  // 名字太短/太通用的条目（Networks、Cognition）不适合做模式匹配，
  // 但可以在“整段名字恰好等于它”时标记为“存疑”，避免误说成“未收录”。
  const genericMap = new Map();

  function addFull(name, e) {
    const toks = tokensOf(name, true);
    if (!toks.length) return;
    const key = toks.join('|');
    if (letters(toks) < 10) {
      const abbr = cleanAbbr(e.abbr);
      if (abbr !== 'JACM' && abbr !== 'Proc.IEEE') {
        const old = genericMap.get(key);
        if (!old || RANK_VAL[old.rank] < RANK_VAL[e.rank]) genericMap.set(key, e);
      }
      return;
    }
    const old = patMap.get(key);
    if (old && RANK_VAL[old.e.rank] >= RANK_VAL[e.rank]) return;
    patMap.set(key, { toks: toks, e: e });
  }
  ENTRIES.forEach(function (e) {
    addFull(e.full, e);
    const m = e.full.match(/[（(](?:原)?([^）)]+)[）)]/);
    if (m) addFull(m[1], e);
    const bare = e.full.replace(/[（(][^）)]*[）)]/g, ' ');
    if (bare !== e.full) addFull(bare, e);
  });
  Object.keys(ALIAS_FULL).forEach(function (alias) {
    const e = byAbbr.get(ALIAS_FULL[alias]);
    if (e) addFull(alias, e);
  });
  patMap.forEach(function (v) { fullIndex.push([v.toks, v.e, letters(v.toks)]); });
  fullIndex.sort(function (a, b) { return b[2] - a[2]; });

  /* --- 简称索引：按大写 token 匹配 --- */
  // 只接受“像缩写”的简称：全大写、含数字、驼峰（MobiCom/EuroSys/HotNets），
  // 排除 Networking / Internetware 这类普通单词，避免误伤长全称里的普通单词。
  function isAbbrLike(a) {
    if (!a) return false;
    if (/\s/.test(a)) return a.split(/\s+/).every(function (w) { return /^[A-Z0-9&+\/.-]{2,}$/.test(w); });
    if (!/^[A-Za-z0-9&+\/.-]+$/.test(a)) return false;
    if (/\d/.test(a)) return true;
    if (/[a-z]/.test(a) && !/[a-z][A-Z]/.test(a)) return false;
    return /[A-Z]{2,}/.test(a) || /[a-z][A-Z]/.test(a);
  }

  const abbrMap = new Map();
  function addAbbr(a, e) {
    const key = String(a || '').replace(/^CCF[-\s]*/i, '').replace(/\s+/g, ' ').trim();
    if (!isAbbrLike(key)) return;
    const old = abbrMap.get(key);
    if (old && RANK_VAL[old.rank] >= RANK_VAL[e.rank]) return;
    abbrMap.set(key, e);
  }
  ENTRIES.forEach(function (e) {
    addAbbr(cleanAbbr(e.abbr), e);
    const m = e.abbr.match(/[（(](?:原)?([^）)]+)[）)]/);
    if (m) addAbbr(cleanAbbr(m[1]), e);
  });
  const ALIAS_ABBR = {
    'USENIX ATC': 'ACMSIGOPSATC',
    'ATC': 'ACMSIGOPSATC',
    'PVLDB': 'VLDB',
    'KDD': 'SIGKDD',
    'NIPS': 'NeurIPS'
  };
  Object.keys(ALIAS_ABBR).forEach(function (k) {
    const e = byAbbr.get(ALIAS_ABBR[k]);
    if (e) addAbbr(k, e);
  });

  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  let ABBR_RE = null;
  function abbrRegex() {
    if (ABBR_RE) return ABBR_RE;
    const keys = Array.from(abbrMap.keys()).sort(function (a, b) { return b.length - a.length; });
    ABBR_RE = new RegExp('(?<![A-Za-z0-9])(' + keys.map(escRe).join('|') + ')(?![A-Za-z0-9])', 'g');
    return ABBR_RE;
  }

  // 覆盖率下限：目录全称至少要占结果中会议/期刊字段 55% 的字母，
  // 防止 “…Conference on Computer and Communication Systems” 被当成 INFOCOM。
  const MIN_COVER = 0.55;

  function matchFull(textToks) {
    if (!textToks.length) return null;
    const total = letters(textToks);
    for (let i = 0; i < fullIndex.length; i++) {
      const pat = fullIndex[i][0];
      if (pat.length > textToks.length) continue;
      const off = textToks.length - pat.length;
      let same = true;
      for (let j = 0; j < pat.length; j++) {
        if (textToks[off + j] !== pat[j]) { same = false; break; }
      }
      if (!same) continue;
      if (fullIndex[i][2] / total < MIN_COVER) continue;
      return fullIndex[i][1];
    }
    return null;
  }

  function matchAbbr(raw) {
    if (!raw) return null;
    const re = abbrRegex();
    re.lastIndex = 0;
    let best = null, bestLen = 0, m;
    while ((m = re.exec(raw)) !== null) {
      const e = abbrMap.get(m[1]);
      if (!e) continue;
      if (m[1].length > bestLen) { best = e; bestLen = m[1].length; }
      else if (m[1].length === bestLen && best && RANK_VAL[e.rank] > RANK_VAL[best.rank]) best = e;
    }
    return best;
  }

  // Google Scholar 的 .gs_a 形如 “作者 - 会议/期刊, 年份 - 站点域名”
  function venuePart(whole) {
    const parts = whole.split(/\s+-\s+/);
    if (parts.length < 2) return '';
    parts.shift(); // 作者
    const last = parts[parts.length - 1].trim();
    if (parts.length > 1 && /^(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}(?:\/\S*)?$/.test(last)) parts.pop();
    return parts.join(' - ').trim();
  }

  function detectFromGsA(whole) {
    const res = classify(whole);
    return res.state === 'hit' ? res.entry : null;
  }

  // 三种状态：
  //   hit     —— 命中 CCF 目录（附带 entry）
  //   none    —— 有会议/期刊字段，但不在目录里（等级 N/A）
  //   unknown —— 谷歌学术没给会议/期刊信息，无法判断
  function classify(whole) {
    if (!whole) return { state: 'unknown', venue: '' };
    const w = String(whole).replace(/\s+/g, ' ').trim();
    const venue = venuePart(w);
    if (!venue) {
      if (/\b(arxiv|biorxiv|medrxiv|ssrn|preprint|researchgate)\b/i.test(w)) return { state: 'none', venue: '' };
      return { state: 'unknown', venue: '' };
    }
    return classifyVenue(venue);
  }

  // 单独给一段“会议/期刊名”定级（「引用」接口拿到的名字也走这里）
  function isTruncated(v) { return /[…]|\.\.\./.test(v); }

  const NOISE_TOKENS = { vol: 1, volume: 1, no: 1, issue: 1, pp: 1, p: 1, part: 1, special: 1, section: 1 };

  // 整段名字是否就是 head，后面只跟卷期页之类的噪声词
  function probeIs(tokens, head) {
    if (tokens.length < head.length) return false;
    for (let i = 0; i < head.length; i++) if (tokens[i] !== head[i]) return false;
    for (let i = head.length; i < tokens.length; i++) if (!NOISE_TOKENS[tokens[i]]) return false;
    return true;
  }

  function classifyVenue(venue) {
    const v = String(venue || '').replace(/\s+/g, ' ').trim();
    if (!v) return { state: 'unknown', venue: '' };
    // 只有年份/标点（如 "2020"）→ 视为没有会议期刊信息
    if (!/[A-Za-z]{2}/.test(v)) return { state: 'unknown', venue: v };
    // 全称匹配前去掉 "(TOCS)" "(USENIX ATC 21)" 这类尾注
    const bare = v.replace(/\([^()]{1,24}\)/g, ' ');
    const probe = bare.toLowerCase().replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim();

    // 名称全由虚词组成的两本 A 类刊物（归一化后几乎不剩 token）。
    // 只允许“卷/期/页”这类噪声词跟在后面，否则 “Proceedings of the 2020 IEEE …” 会被误吞。
    const pt = probe.split(' ');
    if (probeIs(pt, ['proceedings', 'of', 'the', 'ieee'])) {
      const e = byAbbr.get('Proc.IEEE');
      if (e) return { state: 'hit', entry: e, venue: v };
    }
    if (probeIs(pt, ['journal', 'of', 'the', 'acm'])) {
      const e = byAbbr.get('JACM');
      if (e) return { state: 'hit', entry: e, venue: v };
    }

    const toks = tokensOf(bare, false);
    const hit = matchFull(toks) || matchAbbr(v);
    if (hit) return { state: 'hit', entry: hit, venue: v };

    // 整段名字恰好是目录里的通用单词（Networks、Cognition）→ 只是“存疑”
    const generic = toks.length ? genericMap.get(toks.join('|')) : null;
    if (generic) return { state: 'ambiguous', entry: generic, venue: v };

    // 名字被谷歌截断 → 信息不全，不能断言“未收录”
    if (isTruncated(v)) return { state: 'unresolved', venue: v };

    return { state: 'none', venue: v };
  }

  // ==== RUNTIME ====

  const BADGE_CLASS = 'ccf-badge';
  const CSS = [
    '.ccf-badge{display:inline-block;margin:0 0 0 8px;padding:0 6px;border:1px solid;border-radius:4px;',
    'font:700 11px/17px Arial,Helvetica,"PingFang SC","Microsoft YaHei",sans-serif;letter-spacing:.2px;',
    'vertical-align:middle;white-space:nowrap;cursor:help;user-select:none;text-decoration:none}',
    '.ccf-badge.ccf-rank-a{color:#fff;background:#c5221f;border-color:#c5221f}',
    '.ccf-badge.ccf-rank-b{color:#3a2200;background:#f9ab00;border-color:#e09400}',
    '.ccf-badge.ccf-rank-c{color:#fff;background:#1967d2;border-color:#1967d2}',
    '.ccf-badge.ccf-na{color:#5f6368;background:#f1f3f4;border-color:#9aa0a6;font-weight:600}',
    '.ccf-badge.ccf-unresolved{color:#5f6368;background:transparent;border-color:#b0b6bb;border-style:dashed;font-weight:600}',
    '.ccf-badge.ccf-ambiguous{color:#5f6368;background:transparent;border-color:#b0b6bb;border-width:3px;border-style:double;font-weight:600}',
    '.ccf-badge.ccf-unknown{color:#74797e;background:transparent;border-color:#dadce0;border-style:dotted;font-weight:600}',
    '.ccf-badge.ccf-pending{color:#74797e;background:transparent;border-color:#dadce0;border-style:dotted;font-weight:500}',
    '.ccf-badge:hover{filter:brightness(.95)}'
  ].join('');

  function ensureStyle() {
    if (document.getElementById('ccf-scholar-style')) return;
    const st = document.createElement('style');
    st.id = 'ccf-scholar-style';
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  let mode = 'full';
  let showNA = true;
  let useCite = true;
  try {
    if (typeof GM_getValue === 'function') {
      mode = GM_getValue('ccf_mode', 'full') || 'full';
      showNA = GM_getValue('ccf_show_na', true) !== false;
      useCite = GM_getValue('ccf_use_cite', true) !== false;
    } else {
      mode = localStorage.getItem('ccf_mode') || 'full';
      showNA = localStorage.getItem('ccf_show_na') !== '0';
      useCite = localStorage.getItem('ccf_use_cite') !== '0';
    }
  } catch (e) { /* ignore */ }

  function saveMode(v) {
    mode = v;
    try {
      if (typeof GM_setValue === 'function') GM_setValue('ccf_mode', v);
      else localStorage.setItem('ccf_mode', v);
    } catch (e) { /* ignore */ }
  }

  function saveShowNA(v) {
    showNA = v;
    try {
      if (typeof GM_setValue === 'function') GM_setValue('ccf_show_na', v);
      else localStorage.setItem('ccf_show_na', v ? '1' : '0');
    } catch (e) { /* ignore */ }
  }

  function saveUseCite(v) {
    useCite = v;
    try {
      if (typeof GM_setValue === 'function') GM_setValue('ccf_use_cite', v);
      else localStorage.setItem('ccf_use_cite', v ? '1' : '0');
    } catch (e) { /* ignore */ }
  }

  function makeBadge(res) {
    const s = document.createElement('span');
    if (res.state === 'hit') {
      const hit = res.entry;
      s.className = BADGE_CLASS + ' ccf-rank-' + hit.rank.toLowerCase() + ' ccf-type-' + hit.type;
      s.textContent = mode === 'compact'
        ? 'CCF-' + hit.rank
        : TYPE_NAME[hit.type] + ' · CCF-' + hit.rank;
      s.title = hit.full + '\n' +
        hit.cat + ' · CCF ' + hit.rank + ' 类' + TYPE_NAME[hit.type] +
        (cleanAbbr(hit.abbr) ? '（' + cleanAbbr(hit.abbr) + '）' : '') + '\nCCF 推荐目录（第七版）';
    } else if (res.state === 'none') {
      s.className = BADGE_CLASS + ' ccf-na';
      s.textContent = mode === 'compact' ? 'N/A' : 'CCF: 未收录';
      s.title = (res.venue ? '会议/期刊：' + res.venue + '\n' : '') +
        (res.via === 'cite' ? '（名称来自谷歌学术「引用」信息）\n' : '') +
        '不在 CCF 推荐目录（第七版）中，等级 N/A';
    } else if (res.state === 'unresolved') {
      s.className = BADGE_CLASS + ' ccf-unresolved';
      s.textContent = mode === 'compact' ? '?' : 'CCF: 待确认';
      s.title = '会议/期刊名被截断或缺失，且「引用」补全未成功，无法判定等级' +
        (res.venue ? '\n原始：' + res.venue : '');
    } else if (res.state === 'ambiguous') {
      const e = res.entry;
      s.className = BADGE_CLASS + ' ccf-ambiguous';
      s.textContent = mode === 'compact' ? '?' : 'CCF: 存疑';
      s.title = '疑似：' + e.full + '\n' +
        e.cat + ' · CCF ' + e.rank + ' 类' + TYPE_NAME[e.type] +
        (cleanAbbr(e.abbr) ? '（' + cleanAbbr(e.abbr) + '）' : '') + '\n' +
        '该名称过于通用，无法确认就是这本刊物，故不直接给出等级';
    } else if (res.state === 'pending') {
      s.className = BADGE_CLASS + ' ccf-pending';
      s.textContent = mode === 'compact' ? '…' : 'CCF: 查询中…';
      s.title = '会议/期刊名被谷歌学术截断，正在通过「引用」信息补全…';
    } else {
      s.className = BADGE_CLASS + ' ccf-unknown';
      s.textContent = mode === 'compact' ? '?' : 'CCF: 未知';
      s.title = '谷歌学术未提供会议/期刊信息，无法判断 CCF 等级';
    }
    s.addEventListener('click', function (ev) { ev.stopPropagation(); }, true);
    return s;
  }

  // 结果缓存：同一段 .gs_a 文本只匹配一次（MutationObserver 会反复触发扫描）
  const detCache = new Map();
  function detectCached(ga) {
    const key = ga.textContent.replace(/\s+/g, ' ').trim().slice(0, 400);
    if (detCache.has(key)) return detCache.get(key);
    const res = classify(key);
    if (detCache.size > 3000) detCache.clear();
    detCache.set(key, res);
    return res;
  }

  /* ---------- 用「引用」信息补全被截断的会议/期刊名 ---------- */

  const citeCache = new Map();  // clusterId -> 会议/期刊名（'' 表示取不到）
  const triedCids = new Set();
  const jobQueue = [];
  const MAX_LOOKUPS = 20;       // 单页最多查 20 条，避免触发谷歌的验证码
  let lookups = 0;
  let pumpTimer = null;

  function clusterId(ri) {
    const holder = ri.closest ? ri.closest('[data-cid]') : null;
    if (holder) {
      const v = holder.getAttribute('data-cid');
      if (v) return v;
    }
    const cit = ri.querySelector('.gs_or_cit');
    if (cit) {
      const v = cit.getAttribute('data-cid');
      if (v) return v;
      const m = (cit.getAttribute('onclick') || '').match(/gs_ocit\(\s*event\s*,\s*'?(\d+)'?/);
      if (m) return m[1];
    }
    return null;
  }

  function citeUrl(cid, scirp) {
    const hl = (location.search.match(/[?&]hl=([^&]*)/) || [])[1] || 'zh-CN';
    return '/scholar?q=info:' + encodeURIComponent(cid) + ':scholar.google.com/&output=cite&scirp=' +
      (scirp || 0) + '&hl=' + encodeURIComponent(hl);
  }

  function resultIndex(ri) {
    const all = document.querySelectorAll('.gs_ri');
    for (let i = 0; i < all.length; i++) if (all[i] === ri) return i;
    return 0;
  }

  function cleanText(html) {
    return String(html)
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
      .replace(/\s+/g, ' ').trim();
  }

  // 引用页里优先取 BibTeX 的 journal/booktitle，其次取 MLA 格式里 <i>会议/期刊名</i>
  function parseCiteVenues(html) {
    const out = [];
    if (!html) return out;
    const all = html.match(/(?:journal|booktitle)\s*=\s*\{([^}]{2,300})\}/gi) || [];
    all.forEach(function (m) {
      const v = m.replace(/^[^=]*=\s*\{/, '').replace(/\}$/, '');
      out.push(cleanText(v));
    });
    const re = /<i>([\s\S]{2,300}?)<\/i>/gi;
    let m;
    while ((m = re.exec(html)) !== null) out.push(cleanText(m[1]));
    return out.filter(function (s) { return s && s.length > 2; });
  }

  function fetchText(url) {
    if (typeof fetch !== 'function') return Promise.resolve({ ok: false, text: '' });
    return fetch(url, { credentials: 'include' })
      .then(function (r) {
        if (!r.ok) return { ok: false, text: '' };
        return r.text().then(function (t) { return { ok: true, text: t }; });
      })
      .catch(function () { return { ok: false, text: '' }; });
  }

  function pickVenue(cands) {
    if (!cands || !cands.length) return '';
    for (let i = 0; i < cands.length; i++) {
      if (classifyVenue(cands[i]).state === 'hit') return cands[i];
    }
    return cands[0];
  }

  function resolveViaCite(cid, scirp) {
    return fetchText(citeUrl(cid, scirp)).then(function (r) {
      if (!r.ok) { // 被限流/验证码拦了就别再补刀
        console.debug('[CCF] 引用接口未返回 200，跳过补全：', citeUrl(cid, scirp));
        return '';
      }
      const cands = parseCiteVenues(r.text);
      if (cands.length) return pickVenue(cands);
      // 引用页正常但解析不出名字 → 退一步取 BibTeX（优先用页面里给出的真实链接）
      console.debug('[CCF] 引用页解析不出会议名，改用 BibTeX 导出');
      const href = r.text.match(/href="([^"]*scholar\.bib\?[^"]+)"/);
      const hl = (location.search.match(/[?&]hl=([^&]*)/) || [])[1] || 'zh-CN';
      const bibUrl = href
        ? href[1].replace(/&amp;/g, '&')
        : '/scholar.bib?q=info:' + encodeURIComponent(cid) +
          ':scholar.google.com/&output=citation&scirp=' + (scirp || 0) +
          '&hl=' + encodeURIComponent(hl) + '&ct=citation&cd=0';
      return fetchText(bibUrl).then(function (b) {
        return b.ok ? pickVenue(parseCiteVenues(b.text)) : '';
      });
    }).catch(function () { return ''; });
  }

  // 只有“名字被截断”或“根本没有会议/期刊字段”才值得发请求
  function needsCiteLookup(res) {
    return res.state === 'unknown' || res.state === 'unresolved';
  }

  function setBadge(ri, res) {
    const rt = ri.querySelector('.gs_rt');
    if (!rt) return;
    rt.querySelectorAll('.' + BADGE_CLASS).forEach(function (b) { b.remove(); });
    rt.appendChild(makeBadge(res));
  }

  function toResult(venue) {
    const c = classifyVenue(venue);
    if (c.state === 'hit') return c;
    c.via = 'cite';
    return c;
  }

  function enqueue(job) { jobQueue.push(job); pump(); }

  function pump() {
    if (pumpTimer || !jobQueue.length) return;
    pumpTimer = setTimeout(function () {
      pumpTimer = null;
      const job = jobQueue.shift();
      if (!job) return;
      lookups++;
      resolveViaCite(job.cid, job.scirp).then(function (venue) {
        citeCache.set(job.cid, venue || '');
        if (!venue) { if (job.ri.isConnected) setBadge(job.ri, job.res); return; }
        if (job.ri.isConnected) setBadge(job.ri, toResult(venue));
      }).catch(function () {
        if (job.ri.isConnected) setBadge(job.ri, job.res);
      }).then(function () { pump(); });
    }, 800);
  }

  function scan() {
    ensureStyle();
    const ris = document.querySelectorAll('.gs_ri');
    for (let i = 0; i < ris.length; i++) {
      const ri = ris[i];
      const rt = ri.querySelector('.gs_rt');
      const ga = ri.querySelector('.gs_a');
      if (!rt || !ga) continue;
      if (ri.querySelector('.' + BADGE_CLASS)) continue; // 已标注（或页面重渲染过）

      const res = detectCached(ga);
      const cid = clusterId(ri);

      // 之前用「引用」查到过就复用
      let out = res;
      if (res.state !== 'hit' && cid && citeCache.has(cid) && citeCache.get(cid)) {
        out = toResult(citeCache.get(cid));
      }
      if (out.state !== 'hit' && !showNA) continue;

      // 截断 / 缺失的会议期刊名，交给「引用」补全
      const needLookup = out.state !== 'hit' && useCite && cid && needsCiteLookup(out) &&
        !citeCache.has(cid) && !triedCids.has(cid) && lookups + jobQueue.length < MAX_LOOKUPS;
      if (needLookup) {
        triedCids.add(cid);
        rt.appendChild(makeBadge({ state: 'pending' }));
        enqueue({ ri: ri, cid: cid, res: out, scirp: resultIndex(ri) });
        continue;
      }
      rt.appendChild(makeBadge(out));
    }
  }

  let timer = null;
  function schedule() {
    if (timer) return;
    timer = setTimeout(function () { timer = null; scan(); }, 150);
  }

  function isOwnNode(n) {
    return n && n.nodeType === 1 && n.classList && n.classList.contains(BADGE_CLASS);
  }

  const mo = new MutationObserver(function (muts) {
    for (let i = 0; i < muts.length; i++) {
      const added = muts[i].addedNodes;
      for (let j = 0; j < added.length; j++) {
        if (!isOwnNode(added[j])) { schedule(); return; }
      }
    }
  });

  function resetAndScan() {
    detCache.clear();
    document.querySelectorAll('.' + BADGE_CLASS).forEach(function (b) { b.remove(); });
    scan();
  }

  function boot() {
    scan();
    if (document.body) mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('popstate', schedule);
  }

  if (typeof GM_registerMenuCommand === 'function') {
    GM_registerMenuCommand('切换样式：详细（期刊/会议+等级）/ 紧凑（仅等级）', function () {
      saveMode(mode === 'full' ? 'compact' : 'full');
      resetAndScan();
    });
    GM_registerMenuCommand('重新扫描当前页面', resetAndScan);
    GM_registerMenuCommand((showNA ? '✅ ' : '⬜ ') + '标记非 A/B/C 的条目（未收录 / 待确认 / 存疑 / 未知）', function () {
      saveShowNA(!showNA);
      resetAndScan();
    });
    GM_registerMenuCommand((useCite ? '✅ ' : '⬜ ') + '用「引用」补全被截断的会议/期刊名', function () {
      saveUseCite(!useCite);
      if (!useCite) jobQueue.length = 0;
      resetAndScan();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
