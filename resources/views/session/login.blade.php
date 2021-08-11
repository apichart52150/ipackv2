@extends('layouts.app')
@section('title','iPACKS | Student')

@section('content')
<div class="container">
	<div class="row justify-content-center">
		<div class="col-md-8 col-lg-6 col-xl-5">
			<div class="card">
				<div class="card-body p-4">
					<div class="text-center">
						<div class="text-center mb-3">
	                        <h3 class="font-weight-bold text-primary"><i class="fas fa-info"></i> PACKS LOGIN <span class="d-none d-sm-inline">|</span> <span class="text-dark">Student</span> </h3>
	                    </div>
					</div>
					<form >
						{{ csrf_field() }}
						<div class="form-group mb-3">
							<label for="username">Username</label>
							<input class="form-control {{ $errors->has('username') ? 'is-invalid' : '' }}" type="text" id="username" name="username" required="" placeholder="Enter your username" value="{{ old('username') }}">
							<span class="invalid-feedback">
								{{ $errors->first('username') }}
							</span>
						</div>

						<div class="form-group mb-3">
							<label for="password">Password</label>
							<input class="form-control {{ $errors->has('password') ? 'is-invalid' : '' }}" type="password" name="password" required="" id="password" placeholder="Enter your password">
							<span class="invalid-feedback">
								{{ $errors->first('password') }}
							</span>
						</div>

						<div class="form-group mb-0 text-center">
							<button class="btn btn-primary btn-block" type="submit"> Log In </button>
						</div>

					</form>
				</div>
			</div>
			<div class="row mt-3">
				<div class="col-12 text-center">
					<p> <a href="pages-recoverpw.html" class="text-muted ml-1">Forgot your password?</a></p>
					<p class="text-muted">Don't have an account? <a href="pages-register.html" class="text-white font-weight-medium ml-1">Sign Up</a></p>
				</div> <!-- end col -->
			</div>
		</div>
	</div>
</div>
@endsection
