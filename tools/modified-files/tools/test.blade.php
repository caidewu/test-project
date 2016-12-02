@extends('layouts.app')

@section('htmlheader_title')
    {{trans('application.index')}}
@endsection

@section('htmlheader_link')
    <link href="{{ asset('/common/css/common.css') }}" rel="stylesheet" type="text/css"/>
    <link href="{{ asset('/src/example1/style.css') }}" rel="stylesheet" type="text/css"/>
@endsection

@section('htmlbody_script')
    <script src="{{ asset('/src/example1/index.js?v=12345') }}" type="text/javascript"></script>
@endsection

@include('layouts.partials.mainheader')

@section('main-content')
    <div class="container spark-screen">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">Welcome</div>

                    <div class="panel-body">
                        {{ trans('adminlte.logged') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
<!-- REQUIRED JS SCRIPTS -->

<!-- jQuery 2.1.4 -->
<script src="{{ asset('/adminlte/plugins/jQuery/jquery-2.2.3.min.js?v=12345') }}"></script>
<!-- Bootstrap 3.3.2 JS -->
<script src="{{ asset('/adminlte/bootstrap/js/bootstrap.min.js?v=12345') }}" type="text/javascript"></script>
<!-- DataTables -->
<script src="{{ asset('/adminlte/plugins/datatables/jquery.dataTables.min.js?v=12345') }}" type="text/javascript"></script>
<script src="{{ asset('/adminlte/plugins/datatables/dataTables.bootstrap.min.js?v=12345') }}" type="text/javascript"></script>
<!-- AdminLTE App -->
<script src="{{ asset('/adminlte/dist/js/app.min.js?v=12345') }}" type="text/javascript"></script>

<!-- Optionally, you can add Slimscroll and FastClick plugins.
      Both of these plugins are recommended to enhance the
      user experience. Slimscroll is required when using the
      fixed layout. -->

@yield('htmlbody_script')