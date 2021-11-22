var documenterSearchIndex = {"docs":
[{"location":"library/#Library","page":"Library","title":"Library","text":"","category":"section"},{"location":"library/#Plan","page":"Library","title":"Plan","text":"","category":"section"},{"location":"library/","page":"Library","title":"Library","text":"The current state of the domain decomposition algorithm is stored in an AbstractPlan. The only AbstractPlan provided is called DomDecPlan, but new ones can be build if needed. Though it is not strictly necessary to understand its internals to use it, we leave it here for reference: ","category":"page"},{"location":"library/","page":"Library","title":"Library","text":"DomDecPlan","category":"page"},{"location":"library/","page":"Library","title":"Library","text":"It is important to note that a DomDecPlan does not store the coupling explicitly. Instead, it stores the marginals of the basic cells of the coupling, from which one can recover the Y-marginals of the partitions where the subproblems are solved. This, together with the dual marginals (that are stored in the fields alphas and betas) allows to reconstruct the whole coupling if needed, while only using a fraction of the total memory.","category":"page"},{"location":"library/#Iteration","page":"Library","title":"Iteration","text":"","category":"section"},{"location":"library/","page":"Library","title":"Library","text":"iterate!","category":"page"},{"location":"library/#DomDecOT.iterate!","page":"Library","title":"DomDecOT.iterate!","text":"iterate!(P, c, solver, params::NamedTuple)\n\nPerform params[:iters] inplace iterations of the domain decomposition algorithm  on the plan P, using the cost c and the inner solver solver.  If params[:parallel_iteration] is true, runs the iterations in parallel.\n\n\n\n\n\n","category":"function"},{"location":"library/","page":"Library","title":"Library","text":"Here it is to note that any cost function c(x,y) consistent with the columns of P.mu.points and P.nu.points will work. ","category":"page"},{"location":"library/","page":"Library","title":"Library","text":"note: Note\nA note about parametersParameters are to be packaged in a NamedTuple. This is a type-stable analog of a dictionary that can be build as followsjulia> (; epsilon = 1.0, truncation_thres = 1e-14, verbose = true)\n(epsilon = 1.0, truncation_thres = 1e-14, verbose = true)DomDecOT.jl provides easy ways to generate and operate with this tuples, that will be covered in section [ref]","category":"page"},{"location":"library/#Solvers","page":"Library","title":"Solvers","text":"","category":"section"},{"location":"library/","page":"Library","title":"Library","text":"The subproblems are solved with one of the following solvers, that build upon those provided by MultiScaleOT.jl.","category":"page"},{"location":"library/","page":"Library","title":"Library","text":"domdec_sinkhorn_stabilized!","category":"page"},{"location":"library/#DomDecOT.domdec_sinkhorn_stabilized!","page":"Library","title":"DomDecOT.domdec_sinkhorn_stabilized!","text":"domdec_sinkhorn_stabilized!(β, α, νJ, νI, μJ, C, ε; kwargs...)\n\nSolve cell problem using the stabilized Sinkhorn algorithm of the  MultiScaleOT library. \n\nArguments\n\nβ: initial Y dual potential\nα: initial X dual potential\nνJ: Y cell marginal \nνI: global Y marginal supported on the same points as νJ_global\nμJ: X cell marginal\nC: cost matrix. It is transformed inplace to yield the primal plan \nε: regularization\n\n\n\n\n\n","category":"function"},{"location":"library/","page":"Library","title":"Library","text":"domdec_logsinkhorn!","category":"page"},{"location":"library/#DomDecOT.domdec_logsinkhorn!","page":"Library","title":"DomDecOT.domdec_logsinkhorn!","text":"domdec_logsinkhorn!(β, α, νJ, νI, μJ, C, ε; kwargs...)\n\nSolve cell problem using the log-domain Sinkhorn algorithm of the  MultiScaleOT library. \n\nArguments\n\nβ: initial Y dual potential\nα: initial X dual potential\nνJ: Y cell marginal \nνI: global Y marginal supported on the same points as νJ_global\nμJ: X cell marginal\nC: cost matrix. It is transformed inplace to yield the primal plan \nε: regularization\n\n\n\n\n\n","category":"function"},{"location":"library/","page":"Library","title":"Library","text":"domdec_sinkhorn_autofix_log!","category":"page"},{"location":"library/#DomDecOT.domdec_sinkhorn_autofix_log!","page":"Library","title":"DomDecOT.domdec_sinkhorn_autofix_log!","text":"domdec_sinkhorn_autofix_log!(β, α, νJ, νI, μJ, C, ε; kwargs...)\n\nAttempt to solve the cell problem by calling sinkhorn_stabilized!. If the algorithm errors, fall back to logsinkhorn!. \n\nArguments\n\nβ: initial Y dual potential\nα: initial X dual potential\nνJ: Y cell marginal \nνI: global Y marginal supported on the same points as νJ_global\nμJ: X cell marginal\nC: cost matrix. It is transformed inplace to yield the primal plan \nε: regularization\n\n\n\n\n\n","category":"function"},{"location":"library/#Obtaining-the-coupling-and-duals","page":"Library","title":"Obtaining the coupling and duals","text":"","category":"section"},{"location":"library/","page":"Library","title":"Library","text":"One we have performed a series of iterations, we are usually interested in obtaining the actual coupling.","category":"page"},{"location":"library/","page":"Library","title":"Library","text":"plan_to_dense_matrix","category":"page"},{"location":"library/#DomDecOT.plan_to_dense_matrix","page":"Library","title":"DomDecOT.plan_to_dense_matrix","text":"plan_to_dense_matrix(P, c[, k, balancing = true])\n\nTurn P into a dense matrix using the dual potentials of partition k.\n\n\n\n\n\n","category":"function"},{"location":"library/","page":"Library","title":"Library","text":"plan_to_sparse_matrix","category":"page"},{"location":"library/#DomDecOT.plan_to_sparse_matrix","page":"Library","title":"DomDecOT.plan_to_sparse_matrix","text":"plan_to_sparse_matrix(P, c[, k, balancing = true])\n\nTurn P into a sparse matrix using the dual in the last iteration.\n\n\n\n\n\n","category":"function"},{"location":"library/","page":"Library","title":"Library","text":"As well as the primal coupling, we are usually interested in obtaining the duals. Note that in a DomDecPlan only the duals of each partition are saved, so one must glue them all together to obtain global potentials. This is achieved with the following function.","category":"page"},{"location":"library/","page":"Library","title":"Library","text":"smooth_alpha_and_beta_fields","category":"page"},{"location":"library/#DomDecOT.smooth_alpha_and_beta_fields","page":"Library","title":"DomDecOT.smooth_alpha_and_beta_fields","text":"smooth_alpha_and_beta_field(P::DomDecPlan, c)\n\nCompute a smooth version of the duals of P by performing a Helmholtz decomposition (see https://arxiv.org/abs/2001.10986, Section 6.3 for details)\n\n\n\n\n\n","category":"function"},{"location":"library/#Computing-scores","page":"Library","title":"Computing scores","text":"","category":"section"},{"location":"library/","page":"Library","title":"Library","text":"One can compute the primal and dual scores directly on the DomDecPlan by calling the following functions.","category":"page"},{"location":"library/","page":"Library","title":"Library","text":"primal_score","category":"page"},{"location":"library/#DomDecOT.primal_score","page":"Library","title":"DomDecOT.primal_score","text":"primal_score(P, c, ε)\n\nCompute the primal score of P for the entropic problem  with cost function c and regularization ε, using only the non-zero entries of P. \n\n\n\n\n\n","category":"function"},{"location":"library/","page":"Library","title":"Library","text":"dual_score","category":"page"},{"location":"library/#DomDecOT.dual_score","page":"Library","title":"DomDecOT.dual_score","text":"dual_score(P, c,  ε)\n\nCompute the dual score of P for the entropic problem  with cost function c and regularization ε, using only the non-zero entries of P. For the dense dual score, consider converting first P to a sparse matrix and then using the routines of MultiScaleOT.\n\n\n\n\n\n","category":"function"},{"location":"library/","page":"Library","title":"Library","text":"PD_gap","category":"page"},{"location":"library/#DomDecOT.PD_gap","page":"Library","title":"DomDecOT.PD_gap","text":"PD_gap(P, c,  ε)\n\nPrimal-dual gap of plan P for the cost c and regularization ε.\n\n\n\n\n\n","category":"function"},{"location":"library/","page":"Library","title":"Library","text":"Alternatively, if the global primal and duals are already available in matrix form, one can also use the functions primal_score_sparse and dual_score_sparse of the MultiScaleOT.jl library.","category":"page"},{"location":"library/#Refinement","page":"Library","title":"Refinement","text":"","category":"section"},{"location":"library/","page":"Library","title":"Library","text":"Domain decomposition becomes really powerful when combined with a hierarchical scheme. For this it is necessary to, from a coarse solution to layer k-1, provide a feasible initialization for the finer layer k. This can be achieved with refine_plan, which also initializes the duals of the new plan by interpolating between those in the old one. ","category":"page"},{"location":"library/","page":"Library","title":"Library","text":"refine_plan","category":"page"},{"location":"library/#DomDecOT.refine_plan","page":"Library","title":"DomDecOT.refine_plan","text":"refine_plan(P::DomDecPlan, \n            μH::MultiScaleMeasure{GridMeasure{D}}, \n            νH::MultiScaleMeasure, \n            k::Int;\n            consistency_check = true) where D\n\nRefine the plan P to match the refinement of the X marginal  μH[k-1] -> μH[k] and of the Y marginal νH[k-1] -> νH[k]\n\n\n\n\n\n","category":"function"},{"location":"#Home","page":"Home","title":"Home","text":"","category":"section"},{"location":"#The-domain-decomposition-algorithm","page":"Home","title":"The domain decomposition algorithm","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"DomDecOT.jl is a Julia library for solving (entropic) optimal transport (OT) with the domain decomposition algorithm for optimal transport. The domain decomposition methods works by dividing the optimal transport problem into smaller problems, solving them independently and combining the partial solutions together. Under an appropriate choice of the subproblems, it converges linearly to the optimal solution. Thus it is amenable to parallelization and efficient.","category":"page"},{"location":"","page":"Home","title":"Home","text":"DomDecOT.jl is designed to be flexible, memory-savy and type-stable. The main routines come in serial and parallel flavors, allowing to leverage multiple cores for faster computation. Types can be extended for custom forms of representing measures. The library is built on top of MultiScaleOT.jl, which provides types for measures, multi-scale measures and many utils.","category":"page"},{"location":"internals/","page":"Internals","title":"Internals","text":"Modules = [DomDecOT]\nOrder   = [:type, :function, :constant]","category":"page"},{"location":"internals/#DomDecOT.AbstractPlan","page":"Internals","title":"DomDecOT.AbstractPlan","text":"AbstractPlan\n\nSuper type of all implementations of OT plans.\n\n\n\n\n\n","category":"type"},{"location":"internals/#DomDecOT.DomDecPlan","page":"Internals","title":"DomDecOT.DomDecPlan","text":"DomDecPlan(mu::AbstractMeasure, nu::AbstractMeasure, gamma,\n            cellsize::Int[, basic_cells::Vector, \n            composite_cells::Vector, partitions::Vector,\n            alphas::Vector, betas::Vector, \n            epsilon::Float64, partk::Int)\n\nA DomDecPlan is a struct that keeps track of the status of the  domain decomposition algorithm in an effient manner. Its arguments are\n\nmu: AbstractMeasure representing the X marginal\nnu: AbstractMeasure representing the Y marginal\ngamma: gamma[i] is a sparse vector representing the current marginal   of basic cell i. Alternatively, gamma can also be a sparse matrix   representing the full initial plan.\ncellsize::Int: maximum size of the basic cells (along all dimensions).\nbasic_cells: basic_cells[i] is the indices of the atoms in mu that   are merged together to form a basic cell. \ncomposite_cells: composite_cells[k][j] refers to the group of basic cells   that constitute the j-th subdomain of the k-th partition.\npartitions: partitions[k][j] are the indices of all the X atoms that constitute the    first marginal during j-th subdomain of partition k. It equals    vcat([basic_cells[composite_cells[k][j]]...)\nalphas: X-dual potential on each subdomain. alphas[k][j] has the same length as partitions[k][j].\nbetas: Y-dual potentials on each subdomain.\nepsilon: last global epsilon used to solve the cell problems.\npartk: index of the last partition whose subdomains were solved.\n\n\n\n\n\n","category":"type"},{"location":"internals/#DomDecOT.PD_gap-Tuple{Any, Any, Any}","page":"Internals","title":"DomDecOT.PD_gap","text":"PD_gap(P, c,  ε)\n\nPrimal-dual gap of plan P for the cost c and regularization ε.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.balance!","page":"Internals","title":"DomDecOT.balance!","text":"balance!(Q, μ, threshold, force_balancing = true)\n\nApply balance! with threshold threshold on pairs of columns of Q  until each column Q[:,i] has mass μ. When force_balancing == true, if a first pass wasn't succesful,  a second pass is attempted seeting threshold = 0.\n\n\n\n\n\n","category":"function"},{"location":"internals/#DomDecOT.balance!-NTuple{4, Any}","page":"Internals","title":"DomDecOT.balance!","text":"balance!(a, b, δ, threshold; force_balancing = false)\n\nTransfer δ mass from vector a to b. The recipient entries must be larger than threshold; if it is not achieved a warning is thrown.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.cell_PD_gap-NTuple{5, Any}","page":"Internals","title":"DomDecOT.cell_PD_gap","text":"cell_PD_gap(P, k, j, c, ε)\n\nPrimal-dual gap in cell j of partition k.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.default_domdec_eps_schedule-Tuple{Int64, Any}","page":"Internals","title":"DomDecOT.default_domdec_eps_schedule","text":"default_domdec_eps_schedule(depth::Int, target_eps; Nsteps = 3, factor = 2., last_iter = Float64[])\n\nReturn schedules for the layer, epsilon and number of domdec iterations. \n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.domdec_logsinkhorn!-NTuple{7, Any}","page":"Internals","title":"DomDecOT.domdec_logsinkhorn!","text":"domdec_logsinkhorn!(β, α, νJ, νI, μJ, C, ε; kwargs...)\n\nSolve cell problem using the log-domain Sinkhorn algorithm of the  MultiScaleOT library. \n\nArguments\n\nβ: initial Y dual potential\nα: initial X dual potential\nνJ: Y cell marginal \nνI: global Y marginal supported on the same points as νJ_global\nμJ: X cell marginal\nC: cost matrix. It is transformed inplace to yield the primal plan \nε: regularization\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.domdec_sinkhorn_autofix_log!-NTuple{7, Any}","page":"Internals","title":"DomDecOT.domdec_sinkhorn_autofix_log!","text":"domdec_sinkhorn_autofix_log!(β, α, νJ, νI, μJ, C, ε; kwargs...)\n\nAttempt to solve the cell problem by calling sinkhorn_stabilized!. If the algorithm errors, fall back to logsinkhorn!. \n\nArguments\n\nβ: initial Y dual potential\nα: initial X dual potential\nνJ: Y cell marginal \nνI: global Y marginal supported on the same points as νJ_global\nμJ: X cell marginal\nC: cost matrix. It is transformed inplace to yield the primal plan \nε: regularization\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.domdec_sinkhorn_stabilized!-NTuple{7, Any}","page":"Internals","title":"DomDecOT.domdec_sinkhorn_stabilized!","text":"domdec_sinkhorn_stabilized!(β, α, νJ, νI, μJ, C, ε; kwargs...)\n\nSolve cell problem using the stabilized Sinkhorn algorithm of the  MultiScaleOT library. \n\nArguments\n\nβ: initial Y dual potential\nα: initial X dual potential\nνJ: Y cell marginal \nνI: global Y marginal supported on the same points as νJ_global\nμJ: X cell marginal\nC: cost matrix. It is transformed inplace to yield the primal plan \nε: regularization\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.dual_score-Tuple{Any, Any, Any}","page":"Internals","title":"DomDecOT.dual_score","text":"dual_score(P, c,  ε)\n\nCompute the dual score of P for the entropic problem  with cost function c and regularization ε, using only the non-zero entries of P. For the dense dual score, consider converting first P to a sparse matrix and then using the routines of MultiScaleOT.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.fix_beta!-NTuple{7, Any}","page":"Internals","title":"DomDecOT.fix_beta!","text":"fix_beta!(β, α, C, νJ, νI, μJ, ε)\n\nSet β to the conjugate of α, taking into account the cell parameters. Stable implementation.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.fix_beta!-Tuple{Any, Int64}","page":"Internals","title":"DomDecOT.fix_beta!","text":"fix_beta!(β, N::Int)\n\nCheck if the Y-dual parameter has the appropriate size. If not, turns it  into a zeros(N).  Return true if β was of the appropriate length, false otherwise\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.get_alpha_field-Union{Tuple{M}, Tuple{D}, Tuple{DomDecPlan{MultiScaleOT.GridMeasure{D}, M}, Any}} where {D, M}","page":"Internals","title":"DomDecOT.get_alpha_field","text":"get_alpha_field(P, k)\n\nGlue cell duals of partition k to form a global dual.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.get_alpha_graph-Union{Tuple{M}, Tuple{DomDecPlan{MultiScaleOT.GridMeasure{1}, M}, Any}} where M","page":"Internals","title":"DomDecOT.get_alpha_graph","text":"get_alpha_graph(P::DomDecPlan, alpha_diff, cellsize)\n\nCompute Helmholtz decomposition on, alpha_diff, averaging on basic cells, as explained in https://arxiv.org/abs/2001.10986, Section 6.3.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.get_basic_and_composite_cells-Tuple{Any, Any}","page":"Internals","title":"DomDecOT.get_basic_and_composite_cells","text":"get_basic_and_composite_cells(gridshape, cellsize)\n\nGet the basic and composite cells corresponding to partitioning a grid of shape gridshape into basic cells of size  at most cellsize × ... × cellsize, and then joining groups of 2^D adjacent basic cells together to form composite cells compA. compB is obtained in an analogous manner, but with an offset of  1 along each axes.\n\nExamples\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.get_cell_Y_marginal-Tuple{DomDecPlan, Any}","page":"Internals","title":"DomDecOT.get_cell_Y_marginal","text":"get_cell_Y_marginal(P, J)\n\nCompute the total Y-marginal of a set of basic cells J\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.get_cost_matrix-NTuple{4, Any}","page":"Internals","title":"DomDecOT.get_cost_matrix","text":"get_cost_matrix(P, c, J, I)\n\nReturn the cost matrix corresponding to points Y[:,I] and X[:,J].\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.get_discrete_gradient-Tuple{Any, Any, Any}","page":"Internals","title":"DomDecOT.get_discrete_gradient","text":"get_discrete_gradient(nx, ny, nz)\n\nGet (transpose of) X-, Y- and Z-gradient matrices for a discrete graph of size (nx, ny, nz).\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.get_discrete_gradient-Tuple{Any, Any}","page":"Internals","title":"DomDecOT.get_discrete_gradient","text":"get_discrete_gradient(nx, ny)\n\nGet (transpose of) X- and Y-gradient matrices for a discrete graph of size (nx, ny).\n\nRelation with the Python library\n\nIf we define in Julia\n\ngx, gy = get_discrete_gradient(nx, ny)\n\nand in Python\n\nGX, GY = Common.getDiscreteGradients(ny, nx)\n\nThen GX, GY == gx', gy'\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.get_discrete_gradient-Tuple{Any}","page":"Internals","title":"DomDecOT.get_discrete_gradient","text":"get_discrete_gradient(nx)\n\nGet (transpose of) X-gradient matrices for a one dimensional lattice of size nx.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.get_pairwise_delta-Tuple{Any, Any}","page":"Internals","title":"DomDecOT.get_pairwise_delta","text":"get_pairwise_delta(d1, d2)\n\nFor a pair of values d1, d2 representing the offset of mass of two vectors,  computes the maximum possible transfer of mass that does not make any vector worse than what it is currently. For example, if both vectors have mass in excess or in defect, it returns 0; if one has in excess and another in defect, it returns the smallest of these adjustments, with the corresponding sign. \n\nExamples\n\njulia> getpairwisedelta(1,2), getpairwisedelta(-1, -3) (0, 0)\n\njulia> getpairwisedelta(1,-2) 1\n\njulia> getpairwisedelta(-1,2) -1\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.get_partition-Tuple{Any, Any}","page":"Internals","title":"DomDecOT.get_partition","text":"get_partition(basic_cells, composite_cells)\n\nCompute a partition by joining the basic cells corresponding to each composite cells. \n\nExamples\n\njulia> DD.get_partition([[1], [2, 3], [4]], [[1, 2], [3]])\n2-element Vector{Vector{Int64}}:\n [1, 2, 3]\n [4]\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.iterate!-Tuple{DomDecPlan, Any, Any, NamedTuple}","page":"Internals","title":"DomDecOT.iterate!","text":"iterate!(P, c, solver, params::NamedTuple)\n\nPerform params[:iters] inplace iterations of the domain decomposition algorithm  on the plan P, using the cost c and the inner solver solver.  If params[:parallel_iteration] is true, runs the iterations in parallel.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.iterate_parallel!-Tuple{Any, Int64, Any, Any, Any}","page":"Internals","title":"DomDecOT.iterate_parallel!","text":"iterate_parallel!(P, k, c, solver, params)\n\nRun an (inplace), parallel half iteration k of domain decomposition  on plan P, with cost c, solver solver and ceratain params.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.iterate_serial!-Tuple{Any, Int64, Any, Any, Any}","page":"Internals","title":"DomDecOT.iterate_serial!","text":"iterate_serial!(P, k, c, solver, params)\n\nRun an (inplace), serial half iteration k of domain decomposition  on plan P, with cost c, solver solver and ceratain params.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.make_domdec_schedule-Tuple{}","page":"Internals","title":"DomDecOT.make_domdec_schedule","text":"make_domdec_schedule(; nt...)\n\nBuild schedules for all the parameters in DomDecOT.DEFAULT_PARAMETERS,  as well as those given in the NamedTuple nt.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.plan_to_dense_matrix","page":"Internals","title":"DomDecOT.plan_to_dense_matrix","text":"plan_to_dense_matrix(P, c[, k, balancing = true])\n\nTurn P into a dense matrix using the dual potentials of partition k.\n\n\n\n\n\n","category":"function"},{"location":"internals/#DomDecOT.plan_to_sparse_matrix","page":"Internals","title":"DomDecOT.plan_to_sparse_matrix","text":"plan_to_sparse_matrix(P, c[, k, balancing = true])\n\nTurn P into a sparse matrix using the dual in the last iteration.\n\n\n\n\n\n","category":"function"},{"location":"internals/#DomDecOT.primal_score-Tuple{Any, Any, Any}","page":"Internals","title":"DomDecOT.primal_score","text":"primal_score(P, c, ε)\n\nCompute the primal score of P for the entropic problem  with cost function c and regularization ε, using only the non-zero entries of P. \n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.reduce_cellplan_to_cellmarginals-Tuple{DomDecPlan, AbstractMatrix{T} where T, Any, Any, Any}","page":"Internals","title":"DomDecOT.reduce_cellplan_to_cellmarginals","text":"reduce_cellplan_to_cellmarginals(P::DomDecPlan, PJ::AbstractMatrix, k, j, μJ)\n\nTake the matrix PJ, that is assumed to be the current plan on cell k of partition k and extract its cell marginals.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.reduce_to_cells-Tuple{AbstractMatrix{T} where T, Any}","page":"Internals","title":"DomDecOT.reduce_to_cells","text":"reduce_to_cellsize(γ0::AbstractMatrix, basic_cells)\n\nAdd together marginals corresponding to the same basic cell.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.reduce_to_cells-Tuple{AbstractVector{AbstractVector{T} where T}, Any}","page":"Internals","title":"DomDecOT.reduce_to_cells","text":"reduce_to_cellsize(γ0::AbstractVector, basic_cells)\n\nAdd together marginals corresponding to the same basic cell.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.reduce_to_cells-Tuple{Any, Any, Any}","page":"Internals","title":"DomDecOT.reduce_to_cells","text":"reduce_to_cells(gamma, gridshape, cellSize)\n\nAdd together marginals corresponding to the same basic cell,  for given shapeX and cellSize.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.refine_plan-Union{Tuple{D}, Tuple{DomDecPlan, MultiScaleOT.MultiScaleMeasure{MultiScaleOT.GridMeasure{D}}, MultiScaleOT.MultiScaleMeasure, Int64}} where D","page":"Internals","title":"DomDecOT.refine_plan","text":"refine_plan(P::DomDecPlan, \n            μH::MultiScaleMeasure{GridMeasure{D}}, \n            νH::MultiScaleMeasure, \n            k::Int;\n            consistency_check = true) where D\n\nRefine the plan P to match the refinement of the X marginal  μH[k-1] -> μH[k] and of the Y marginal νH[k-1] -> νH[k]\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.refine_submeasure-Tuple{SparseArrays.SparseVector, Any, Any, Any}","page":"Internals","title":"DomDecOT.refine_submeasure","text":"refine_submeasure(v, u, u2, Js)\n\nRefine the measure v with respect to the Y-cells given in Js by matching the pattern induced by the refinement u -> u2.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.smooth_alpha_and_beta_fields-Union{Tuple{M}, Tuple{D}, Tuple{DomDecPlan{MultiScaleOT.GridMeasure{D}, M}, Any}} where {D, M}","page":"Internals","title":"DomDecOT.smooth_alpha_and_beta_fields","text":"smooth_alpha_and_beta_field(P::DomDecPlan, c)\n\nCompute a smooth version of the duals of P by performing a Helmholtz decomposition (see https://arxiv.org/abs/2001.10986, Section 6.3 for details)\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.smooth_alpha_field-Union{Tuple{DomDecPlan{MultiScaleOT.GridMeasure{D}, M}}, Tuple{M}, Tuple{D}} where {D, M}","page":"Internals","title":"DomDecOT.smooth_alpha_field","text":"smooth_alpha_field(P::DomDecPlan, cellsize)\n\nCompute a smooth version of the X dual of P by performing a Helmholtz decomposition  (see https://arxiv.org/abs/2001.10986, Section 6.3 for details)\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.solvecell!-Tuple{DomDecPlan, Any, Any, Any, Any, Any}","page":"Internals","title":"DomDecOT.solvecell!","text":"solvecell!(P::DomDecPlan, k, j, c, solver, params)\n\nPerform an (inplace) cell iteration on cell P.partitions[k][j] of the plan P, using the inner solver and the given params.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.truncate!-Tuple{AbstractArray, Any}","page":"Internals","title":"DomDecOT.truncate!","text":"truncate!(A, [μJ, ] threshold)\n\nDrop values of ν smaller or equal than threshold. Acts inplace. If μJ is given and A is a matrix, call\n\ntruncate!(A[:,i], μJ[i]*threshold)\n\nfor each column of A.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.truncate!-Tuple{DomDecPlan, Any}","page":"Internals","title":"DomDecOT.truncate!","text":"truncate!(P::AbstractPlan, rel_threshold)\n\nDrop values of the plan P that are smaller than rel_threshold with respect to the cell mass. Acts inplace.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.update_cell_plan!-Tuple{DomDecPlan, Any, Any, Any, Any, Any}","page":"Internals","title":"DomDecOT.update_cell_plan!","text":"update_cell_plan!(P::DomDecPlan, PJ, I, k, j, μJ[;\n        balance = true, truncate = true,\n        truncate_Ythresh = 1e-16, truncate_Ythresh_rel=true])\n\nUpdate cell j of partition k with the given cell plan PJ.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.update_cell_plan!-Tuple{DomDecPlan, Any, Any, Any, Any}","page":"Internals","title":"DomDecOT.update_cell_plan!","text":"update_cell_plan!(P::DomDecPlan, P_basic, k, j, I)\n\nUpdate cell j of partition k of the plan P using the columns in P_basic as the basic cell marginals. I is the real support of the columns of P_basic\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.view_X-Tuple{Any, Any}","page":"Internals","title":"DomDecOT.view_X","text":"view_X(P, J)\n\nReturn a view of the X points in subset J of P.mu.points.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.view_Y-Tuple{Any, Any}","page":"Internals","title":"DomDecOT.view_Y","text":"view_cell_Y(P, I)\n\nReturn a view of the Y points with index I.\n\n\n\n\n\n","category":"method"},{"location":"internals/#DomDecOT.DEFAULT_PARAMETERS","page":"Internals","title":"DomDecOT.DEFAULT_PARAMETERS","text":"DEFAULT_PARAMETERS\n\nDefault parameters for the domdec routines\n\n\n\n\n\n","category":"constant"}]
}
