import React from "react";
import Json from './data.json';
import FormBanner from "../../Atoms/FormBanner/FormBanner";
import CreateInputsContainer from "../../Molecules/CreateInputsContainer/CreateInputsContainer";
import { useForm } from "react-hook-form";
import ProductForm from "../../Molecules/CreateInputsContainer/ProductsForm/productForm";
import MachineForm from "../../Molecules/CreateInputsContainer/machinesForm/MachineForm";
import TrainingsForms from "../../Molecules/CreateInputsContainer/trainingsForm/trainingsForm";
import ExersicesForm from "../../Molecules/CreateInputsContainer/exersicesForm/ExersicesForm";


const CreateForm = () => {
    const data = Json;
    
    return (
        <div className="flex gap-5">
            
            {
                data.map((item) => {
                    return (
                        <div className="flex h-fit py-2 w-96">
                            {
                                item.name === "Productos" ? <ProductForm background={{background:item.background}}/> : 
                                item.name === "Maquinas" ? <MachineForm background={{background:item.background}}/> :
                                item.name === "Entrenamientos" ? <TrainingsForms background={{background:item.background}}/> :
                                item.name === "Ejercicios" ? <ExersicesForm background={{background:item.background}}/> :
                                null
                            }
                            
                            <FormBanner name={item.name} background={{background:item.background}}/>
                            {/* <CreateInputsContainer fields={item.fields} selectFields={item.selectFields} background={{background:item.background}}/>
                            <FormBanner name={item.name} background={{background:item.background}}/> */}
                        </div>
                    )
                })
            }
        </div>
    );
};

export default CreateForm;
