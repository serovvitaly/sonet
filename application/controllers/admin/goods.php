<?php

class Admin_Goods_Controller extends Base_Controller
{
    
    public function action_index()
    {
        $per_page = 30;
        
        $page = Input::get('page', 1);
        $skip = ($page > 0) ? $page - 1 : 0;        
        
        $goods = Good::take($per_page)->skip($skip)->get();
        
        $data['goods'] = $goods;
        
        $paginate = Paginator::make($goods, Good::count(), $per_page);
        $data['paginate'] = $paginate->links();
        
        //echo ($data['paginate']);
        
        return View::make('admin.goods.index', $data);
    }
    
    public function action_add()
    {
        return View::make('admin.goods.add');
    }
    
    public function action_edit($id)
    {
        if ($id > 0) {
            $good = Good::find($id)->to_array();
        }
        
        return View::make('admin.goods.edit', $good);
    }
    
    public function action_delete($id = 0)
    {
        if ($id > 0) {
            Good::find($id)->delete();
        }
        
        return Redirect::to('/admin/goods');
    }
    
}